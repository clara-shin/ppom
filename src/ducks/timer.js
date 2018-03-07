import * as firebase from 'firebase';

export const PRESET_TIMER = 'PRESET_TIMER';

export const PPOM_TIMER = 'PPOM_TIMER';
export const BREAK_TIMER = 'BREAK_TIMER';
export const LONG_BREAK_TIMER = 'LONG_BREAK_TIMER';

export const START_TIMER = 'START_TIMER';
export const PAUSE_TIMER = 'PAUSE_TIMER';
export const RESTART_TIMER = 'RESTART_TIMER';
export const END_TIMER = 'END_TIMER';

export const ADD_SECOND = 'ADD_SECOND';

export function presetTimer(timerDetail, pomo) {
  return {
    type: PRESET_TIMER,
    timerDetail,
    ppomTimes: pomo,
  };
}

export function startTimer() {
  return {
    type: START_TIMER,
  };
}

export function pauseTimer() {
  return {
    type: PAUSE_TIMER,
  };
}

export function ppomTimer() {
  return {
    type: PPOM_TIMER,
  };
}

export function breakTimer() {
  return {
    type: BREAK_TIMER,
  };
}

export function longBreakTimer() {
  return {
    type: LONG_BREAK_TIMER,
  };
}

export function restartTimer() {
  return {
    type: RESTART_TIMER,
  };
}

export function endTimer() {
  return {
    type: END_TIMER,
  };
}

export function addSecond(tid) {
  return {
    type: ADD_SECOND,
    tid,
  };
}

const initialState = {
  timerType: PPOM_TIMER,
  isPlaying: false,
  elapsedTime: 0,
  ppomTimes: 0,
  timerDetail: {},
  tid: '',
};

function isLongBreakTime(ppomtimes, frqncy) {
  return (ppomtimes % frqncy === 0);
}

function setBreakTimer(state, type) {
  const breakQuotes = (type === BREAK_TIMER)
    ? ['잘 하고 있어요', '멋지게 해냈어요', '쉬고 다시 갈까요?']
    : ['잘 쉬는 것도 중요해요!', '바깥 바람 좀 쐬고 올까요?', '오직 나를 위한 시간'];
  const randomIdx = Math.floor(Math.random() * breakQuotes.length);
  state.timerDetail.quote = breakQuotes[randomIdx];
  return {
    ...state,
    timerType: type,
    ppomTimes: state.ppomTimes + 1,
    elapsedTime: 0,
    isPlaying: false,
    timerDetail: state.timerDetail,
  };
}

function getTodayDate() {
  const date = new Date(); // Or the date you'd like converted.
  const today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return today.toISOString().split('T')[0];
}

export default function (state = initialState, action) {
  switch (action.type) {
    case PRESET_TIMER:
      return {
        ...state,
        timerType: PPOM_TIMER,
        timerDetail: action.timerDetail,
        ppomTimes: action.ppomTimes,
      };
    case START_TIMER:
      return {
        ...state,
        isPlaying: true,
      };
    case PAUSE_TIMER:
      return {
        ...state,
        isPlaying: false,
      };
    case RESTART_TIMER:
      return {
        ...state,
        isPlaying: false,
        elapsedTime: 0,
        tid: '',
      };
    case BREAK_TIMER:
      return setBreakTimer(state, action.type);
    case LONG_BREAK_TIMER:
      return setBreakTimer(state, action.type);
    case PPOM_TIMER:
      return {
        ...state,
        timerType: PPOM_TIMER,
        elapsedTime: 0,
        isPlaying: false,
      };
    case END_TIMER:
      return {
        ...state,
        isPlaying: false,
        tid: '',
      };
    case ADD_SECOND:
      return {
        ...state,
        tid: action.tid,
        elapsedTime: state.elapsedTime + 1,
      };
    default:
      return state;
  }
}

export const fetchTimerInfo = ({ gid }) => async (dispatch) => {
  const { currentUser } = firebase.auth();
  if (currentUser && gid) {
    const goalsSnap = firebase.database().ref(`goals/${currentUser.uid}/${gid}`).once('value');
    const achieveSnap = firebase.database().ref(`achieves/${currentUser.uid}/${gid}/${getTodayDate()}`).once('value');
    const snapArr = await Promise.all([goalsSnap, achieveSnap]);
    const goalObj = snapArr[0].val();
    const achieveObj = snapArr[1].val();
    const obj = Object.assign(goalObj, { gid });
    const pomo = (achieveObj && 'pomo' in achieveObj) ? achieveObj.pomo : 0;
    dispatch(presetTimer(obj, pomo));
  }
};

export const applyAddSecond = timerInterval => async (dispatch, getState) => {
  const {
    elapsedTime, timerDetail, timerType, ppomTimes,
  } = getState().timer;
  const {
    gid, goal, ppomtime,
  } = timerDetail;
  // if (elapsedTime < ppomtime * 60) {
  if (elapsedTime < 5) {
    dispatch(addSecond(timerInterval));
  } else {
    clearInterval(timerInterval);
    if (timerType === PPOM_TIMER) {
      const { currentUser } = firebase.auth();
      if (!currentUser) {
        return;
      }
      const ref = `achieves/${currentUser.uid}/${gid}/${getTodayDate()}`;
      const snapshot = await firebase.database().ref(ref).once('value');
      const achieve = snapshot.val();
      if (achieve) {
        achieve.pomo += 1;
        achieve.time += parseInt(ppomtime, 10);
        achieve.updatedAt = firebase.database.ServerValue.TIMESTAMP;
        await firebase.database().ref(ref).update(achieve);
      } else {
        await firebase.database().ref(ref).update({
          goal,
          time: parseInt(ppomtime, 10),
          pomo: 1,
          updatedAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
      if (isLongBreakTime(ppomTimes + 1, timerDetail.longbreakfrqncy)) {
        dispatch(longBreakTimer());
      } else {
        dispatch(breakTimer());
      }
    } else {
      dispatch(ppomTimer());
    }
  }
};

export const applyStartTimer = () => async (dispatch, getState) => {
  await dispatch(startTimer());
  const { isPlaying } = getState().timer;
  if (isPlaying) {
    const timerInterval = setInterval(
      () => {
        dispatch(applyAddSecond(timerInterval));
      },
      1000,
    );
  }
};

export const applyPauseOrRestartTimer = isPause => (dispatch, getState) => {
  const { tid } = getState().timer;
  clearInterval(tid);
  if (isPause) {
    dispatch(pauseTimer());
  } else {
    dispatch(restartTimer());
  }
};
