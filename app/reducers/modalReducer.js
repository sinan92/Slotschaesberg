import * as types from '../actions/actionTypes';

const initialState = {
  visibility: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOGGLE_VISIBILITY:
      return {
        ...state,
        visibility: !state.visibility
      };
    default:
      return state;
  }
}
