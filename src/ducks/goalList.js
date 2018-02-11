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

export const fetchGoalList = () => async (dispatch) => {
  dispatch(goalListLoading());
  // 목표 목록 로드하는 부분
  dispatch(goalListSuccess({}));
};
