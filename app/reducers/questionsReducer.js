import * as types from '../actions/actionTypes';

const initialState = {
	fetching: false,
	questions: [],
	currentQuestion: [],
	chosenAnswers: [],
	reward: 0,
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
        currentQuestion: state.questions[action.location],
        reward: state.questions[action.location].beloning
      };
    case types.REDUCE_REWARD:
      return {
        ...state,
        reward: state.reward-action.amount
      };
    case types.INIT_ANSWERS:
      return {
        ...state,
        chosenAnswers: action.answers
      };
    case types.SET_ANSWER:
      const setNewAnswers = [...state.chosenAnswers]
      setNewAnswers[action.id].goed = action.value

      return {
        ...state,
        chosenAnswers: setNewAnswers
      };
    case types.TOGGLE_ANSWER:
      const newAnswers = [...state.chosenAnswers]
      newAnswers[action.id].goed = newAnswers[action.id].goed == "0" ? "1" : "0"

      return {
        ...state,
        chosenAnswers: newAnswers
      };
    default:
      return state;
  }
}
