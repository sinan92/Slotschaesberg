import * as types from '../actions/actionTypes';

const initialState = {
  allQuestions: [],
	questions: [],
	currentQuestion: [],
	chosenAnswers: [],
	reward: 0,
	error: null,
  completedQuestions: new Array(),
  visibleQuestionsCount: 0,
  route: 1,
  grade: 2,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        allQuestions: action.payload
      };
    case types.FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case types.GET_QUESTIONS:
      return {
        ...state,
        questions: state.allQuestions[state.route][state.grade]
      };
    case types.SET_GROUP_ROUTE:
      return {
        ...state,
        route: action.route
      };
    case types.SET_GROUP_GRADE:
      return {
        ...state,
        grade: action.grade
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
    case types.COMPLETED_QUESTION:
      const addCompletedQuestion = [...state.completedQuestions]
      addCompletedQuestion[action.id] = true

      return {
        ...state,
        completedQuestions: addCompletedQuestion
      };
    case types.INCREMENT_VISIBLE_QUESTIONS_COUNT:
      return {
        ...state,
        visibleQuestionsCount: state.visibleQuestionsCount+1
      };
    case types.TOGGLE_ANSWER:
      const newAnswers = [...state.chosenAnswers]
      newAnswers[action.id].goed = newAnswers[action.id].goed == "0" ? "1" : "0"

      return {
        ...state,
        chosenAnswers: newAnswers
      };
    case types.DELETE_QUESTIONS:
      return {
        ...state,
        completedQuestions: new Array(),
        currentQuestion: [],
        chosenAnswers: [],
        reward: 0,
        visibleQuestionsCount: 0,
      }
    default:
      return state;
  }
}
