import * as types from '../actions/actionTypes';

const initialState = {
	fetching: false,
	questions: [],
	currentQuestion: [],
	error: null,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload
      };
    case types.FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case types.GET_QUESTION:
      return {
        ...state,
        currentQuestion: state.questions[action.location]
      };
    default:
      return state;
  }
}
