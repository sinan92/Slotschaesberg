import * as types from '../actions/actionTypes';

const initialState = {
  visibility: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOGGLE_VISIBILITY:
      return {
        ...state,
        visibility: !state.visibility
      };
    case types.ENABLE_VISIBILITY:
      return {
        ...state,
        visibility: true
      };
    case types.DISABLE_VISIBILITY:
      return {
        ...state,
        visibility: false
      };
    default:
      return state;
  }
}