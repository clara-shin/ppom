import * as firebase from 'firebase';

export const LOADING = 'goalList/LOADING';
export const SUCCESS = 'goalList/SUCCESS';

export function goalListLoading() {
  return {
    type: LOADING,
  };
}

export function goalListSuccess(goals) {
  return {
    type: SUCCESS,
    goals,
  };
}

const initialState = {
  loading: false,
  goals: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS:
      return {
        loading: false,
        goals: action.goals,
      };
    default:
      return state;
  }
}

const getTodayDate = () => {
  const date = new Date(); // Or the date you'd like converted.
  const today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return {
    date: today.toISOString().split('T')[0],
    startAt: today.setHours(0, 0, 0, 0) - 1,
    endAt: today.setHours(23, 59, 59, 59) + 1,
  };
};

function getPomo(goalsObj, gid) {
  if (gid in goalsObj) {
    const dateKey = getTodayDate().date;
    const pomo = 'pomo';
    const goalObj = goalsObj[gid];
    if (dateKey in goalObj) {
      if ('pomo' in goalObj[dateKey]) {
        return goalObj[dateKey][pomo];
      }
    }
  }
  return 0;
}

export const fetchGoalList = () => async (dispatch) => {
  dispatch(goalListLoading());
  // 목표 목록 로드하는 부분
  const { currentUser } = firebase.auth();
  // const numOfLimit = 7;
  const goalsRef = firebase.database().ref(`goals/${currentUser.uid}`);
  const goalsSnap = goalsRef.orderByChild('updatedAt').once('value');
  const achievesRef = firebase.database().ref(`achieves/${currentUser.uid}`);
  const achieveSnap = achievesRef.orderByChild('updatedAt').once('value');
  const snapArr = await Promise.all([goalsSnap, achieveSnap]);
  const goalObj = snapArr[0].val();
  const achieveObj = snapArr[1].val();
  if (goalObj && achieveObj) {
    const goals = Object.entries(goalObj).map(([gid, goal]) => (
      {
        ...goal,
        gid,
        pomo: getPomo(achieveObj, gid),
      }
    ));
    goals.sort((a, b) => b.updatedAt - a.updatedAt);
    dispatch(goalListSuccess(goals));
  }
};
