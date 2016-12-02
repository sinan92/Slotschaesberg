import * as types from '../actions/actionTypes';

const initialState = {
  scores: [],
  error: null,
  success: null,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_SCORES_SUCCESS:
      return {
        ...state,
        scores: action.payload
      };
    case types.FETCH_SCORES_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case types.SAVE_SCORE_SUCCESS:
      return {
        ...state,
        success: action.payload
      };
    case types.SAVE_SCORE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
