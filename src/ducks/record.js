import * as firebase from 'firebase';
import * as moment from 'moment';

export const LOADING = 'record/LOADING';
export const SUCCESS = 'record/SUCCESS';
export const USERINFO_SUCCESS = 'record/USERINFO_SUCCESS';
export const SET_DATE = 'record/SET_DATE';
export const SET_ITEM = 'record/SET_ITEM';

export function recordLoading() {
  return {
    type: LOADING,
  };
}

export function recordDateSet(date) {
  return {
    type: SET_DATE,
    date,
  };
}
export function recordItemSet(item) {
  return {
    type: SET_ITEM,
    item,
  };
}

export function recordSuccess(details) {
  return {
    type: SUCCESS,
    details,
  };
}

export function userInfoSuccess(userInfo) {
  return {
    type: USERINFO_SUCCESS,
    userInfo,
  };
}

const mm = moment();
const DATE_FORMAT = 'YYYY-MM-DD';
const initialState = {
  loading: false,
  details: [],
  userInfo: {},
  dateInfo: mm.format(DATE_FORMAT),
  activeItem: 'day',
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
        ...state,
        loading: false,
        details: action.details,
      };
    case USERINFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.userInfo,
      };
    case SET_DATE:
      return {
        ...state,
        details: [],
        dateInfo: action.date,
      };
    case SET_ITEM:
      return {
        ...state,
        activeItem: action.item,
      };
    default:
      return state;
  }
}

function getQuote(pomo) {
  const quotes = [
    '뽐! 오늘도 힘찬 시작!',
    '뽐뽐',
    '뽐뽐뽐',
    '오늘의 뽐생뽐사',
    '다섯 뽐 달성!',
    '뽐뽐뽐뽐뽐뽐',
    '뽐뽐뽐뽐뽐뽐뽐',
    '잘 하고 있어요!',
    '집중력 뿜뿜',
    '정말 열뽐?! 대단해요!',
    '무려 num뽐!',
  ];

  if (pomo >= quotes.length) {
    return quotes[quotes.length - 1].replace('num', pomo);
  }

  return quotes[pomo - 1];
}

const getDayAchieves = async (date) => {
  const { currentUser } = firebase.auth();
  const snapshot = await firebase.database().ref(`achieves/${currentUser.uid}`).once('value');
  const achieveObj = snapshot.val();
  let details = [];
  if (achieveObj) {
    const allAchievesArr = Object.values(achieveObj);
    if (achieveObj) {
      const achieves = allAchievesArr.filter(achieve => achieve[date]);
      details = achieves.map((achieve) => {
        const newAchieve = achieve[date];
        newAchieve.quote = getQuote(newAchieve.pomo);
        return newAchieve;
      });
      details.sort((a, b) => b.pomo - a.pomo);
    }
  }
  return details;
};

const getWeekAchieves = async (weekArr, startOfWeek, endOfWeek) => {
  const { currentUser } = firebase.auth();
  const snapshot = await firebase.database().ref(`achieves/${currentUser.uid}`).once('value');
  const achieveObj = snapshot.val();
  const achieves = {};
  if (achieveObj) {
    const allAchievesArr = Object.values(achieveObj);
    const keys = [];
    allAchievesArr.reduce((prev, curr) => {
      const cur = Object.entries(curr).filter(([date]) => (
        moment(date).isBetween(startOfWeek, endOfWeek, null, '[]')
      ));
      const newPrev = cur.map(([achieveDate, dataObj]) => (
        prev.reduce((pre, acc) => {
          if (acc.name === achieveDate) {
            keys.push(dataObj.goal);
            acc[dataObj.goal] = dataObj.pomo;
            if (dataObj.goal in achieves) {
              const achieveItem = achieves[dataObj.goal];
              achieveItem.time += dataObj.time;
              achieveItem.pomo += dataObj.pomo;
            } else {
              achieves[dataObj.goal] = {
                time: dataObj.time,
                pomo: dataObj.pomo,
              };
            }
            pre.push(acc);
          }
          return pre;
        }, [])
      ));
      if (newPrev.length) {
        return [...prev, ...newPrev];
      }
      return [...prev];
    }, weekArr);
    const uniqueKeys = [...new Set(keys)];
    weekArr.forEach((item) => {
      const curItem = item;
      curItem.name = moment(item.name).format('ddd');
      uniqueKeys.forEach((goal) => {
        if (!(goal in curItem)) {
          curItem[goal] = 0;
        }
      });
    });
    return { data: weekArr, keys: uniqueKeys, achieves };
  }
  return { data: [], keys: [], achieves };
};

export const fetchRecordInit = (date = mm.format(DATE_FORMAT)) => async (dispatch) => {
  dispatch(recordLoading());
  // 목표 목록 로드하는 부분
  const { currentUser } = firebase.auth();
  const userInfo = {
    name: currentUser.displayName,
    photoURL: currentUser.photoURL,
  };
  dispatch(userInfoSuccess(userInfo));
  const details = await getDayAchieves(date);
  dispatch(recordSuccess(details));
};

export const handleDateClick = dayIdx => async (dispatch, getState) => {
  const { activeItem, dateInfo } = getState().record;
  let details;
  let date;
  if (activeItem === 'day') {
    date = moment(dateInfo);
    if (dayIdx > 0 && moment(dateInfo).isSame(mm.format(DATE_FORMAT))) {
      return;
    }
    date = date.add(dayIdx, 'days').format(DATE_FORMAT);
    dispatch(recordDateSet(date));
    dispatch(recordLoading());
    details = await getDayAchieves(date);
  } else {
    const startDate = moment(dateInfo.split(' ~ ')[0]);
    const endDate = moment(dateInfo.split(' ~ ')[1]);
    if (dayIdx > 0 && moment(mm).isBetween(startDate, endDate, null, '[]')) { return; }
    date = (dayIdx > 0) ? moment(endDate) : moment(startDate);
    let weekArr = [];
    for (let i = 0; i < 7; i += 1) {
      weekArr.unshift({ name: date.add(dayIdx, 'days').format(DATE_FORMAT) });
    }
    if (dayIdx > 0) {
      weekArr = weekArr.reverse();
    }
    const startOfWeek = weekArr[0].name;
    const endOfWeek = weekArr[6].name;
    const thisWeek = `${startOfWeek} ~ ${endOfWeek}`;
    dispatch(recordDateSet(thisWeek));
    dispatch(recordLoading());
    details = await getWeekAchieves(weekArr, startOfWeek, endOfWeek);
  }
  dispatch(recordSuccess(details));
};

export const handleItemClick = item => async (dispatch) => {
  dispatch(recordItemSet(item));
  const today = mm.format(DATE_FORMAT);
  let details;
  if (item === 'day') {
    dispatch(recordDateSet(today));
    dispatch(recordLoading());
    details = await getDayAchieves(mm.format(DATE_FORMAT));
  } else if (item === 'week') {
    const weekArr = [];
    const startOfWeek = moment().subtract(mm.days(), 'days').format(DATE_FORMAT);
    const endOfWeek = moment().add(6 - mm.days(), 'days').format(DATE_FORMAT);
    const thisWeek = `${startOfWeek} ~ ${endOfWeek}`;
    for (let i = 0; i < 7; i += 1) {
      if (i < mm.days()) {
        weekArr.push({ name: moment().subtract(mm.days() - i, 'days').format(DATE_FORMAT) });
      } else {
        weekArr.push({ name: moment().add(i - mm.days(), 'days').format(DATE_FORMAT) });
      }
    }
    dispatch(recordDateSet(thisWeek));
    dispatch(recordLoading());
    details = await getWeekAchieves(weekArr, startOfWeek, endOfWeek);
  }
  dispatch(recordSuccess(details));
};
