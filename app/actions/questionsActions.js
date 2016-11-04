import * as types from './actionTypes';
import axios from 'axios';

export function fetchQuestions(city) {
  return function (dispatch) { 
    axios.get('http://visia-ontwikkeling.nl/sinan/index.php?route=1&niveau=1')
      .then((response) => {
        dispatch({type: "FETCH_QUESTIONS_SUCCESS", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_QUESTIONS_FAILURE", payload: err})
      })
  }
};

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

export function reduceReward(amount) {
  return {
    type: types.REDUCE_REWARD,
    amount: amount,
  };
}