import * as types from '../actions/actionTypes';

const initialState = null;

export function firebaseRef(state = initialState, action) {
  switch (action.type) {
  case 'FIREBASE_REF_SET':
    return action.value;
  default:
    return state;
  }
}