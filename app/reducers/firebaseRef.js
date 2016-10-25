import * as types from '../actions/actionTypes';

const initialState = null;

function firebaseRef(state = initialState, action) {
  switch (action.type) {
  case 'FIREBASE_REF_SET':
    return action.value;
  default:
    return state;
  }
}