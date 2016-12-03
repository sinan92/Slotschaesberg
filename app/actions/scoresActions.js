import * as types from './actionTypes';
import axios from 'axios';

export function fetchScores() {
  return function (dispatch) { 
    axios.get('http://visia-ontwikkeling.nl/sinan/scores.php')
      .then((response) => {
        dispatch({type: "FETCH_SCORES_SUCCESS", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_SCORES_FAILURE", payload: err})
      })
  }
};

export function saveScore(naam, score) {
  return function (dispatch) { 
    axios.get('http://visia-ontwikkeling.nl/sinan/gebruikerOpslaan.php',
      {params: {
    	password: 'tidycode',
    	naam: naam,
    	score: score
    }})
      .then((response) => {
        dispatch({type: "SAVE_SCORE_SUCCESS", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "SAVE_SCORE_FAILURE", payload: err})
      })
  }
};