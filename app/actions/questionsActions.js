import * as types from './actionTypes';
import axios from 'axios';

export function fetchQuestions(city) {
  return function (dispatch) { 
    axios.get('http://visia-ontwikkeling.nl/sinan/index.php?route=1&niveau=1')
      .then((response) => {
        console.log(response.data)
        dispatch({type: "FETCH_QUESTIONS_SUCCESS", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_QUESTIONS_FAILURE", payload: err})
      })
  }
};

export function setRoute(route) {
  return {
    type: types.SET_GROUP_ROUTE,
    route: route
  };
}

export function setGrade(grade) {
  return {
    type: types.SET_GROUP_GRADE,
    grade: grade
  };
}

export function getQuestion(location) {
  return {
    type: types.GET_QUESTION,
    location: location,
  };
}

export function initAnswers(answers) {
  return {
    type: types.INIT_ANSWERS,
    answers: answers,
  };
}

export function toggleAnswer(id) {
  return {
    type: types.TOGGLE_ANSWER,
    id: id,
  };
}

export function setAnswer(id, value) {
  return {
    type: types.SET_ANSWER,
    id: id,
    value: value,
  };
}

export function reduceReward(amount) {
  return {
    type: types.REDUCE_REWARD,
    amount: amount,
  };
}

export function completedQuestion(id) {
  return {
    type: types.COMPLETED_QUESTION,
    id: id,
  };
}

export function getQuestions() {
  return {
    type: types.GET_QUESTIONS,
  };
}