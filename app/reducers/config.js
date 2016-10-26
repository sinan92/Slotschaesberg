import * as types from '../actions/actionTypes';

const initialState = {};

export function config(state = initialState, action) {
  switch (action.type) {
  case 'CONFIG_REPLACE':
    return Object.assign({}, action.value); // note: we replace state entirely here
  default:
    return state;
  }
}