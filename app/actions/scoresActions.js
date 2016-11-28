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