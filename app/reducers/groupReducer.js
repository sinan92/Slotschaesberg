import * as types from '../actions/actionTypes';

const initialState = {
  name: null,
  coins: 0,
  image: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_GROUP_NAME:
      return {
        ...state,
        name: action.name
      };
    case types.ADD_GROUP_COINS:
      return {
        ...state,
        coins: state.coins + action.coins
      };
    case types.REMOVE_GROUP_COINS:
      return {
        ...state,
        coins: state.coins - action.coins
      };
    case types.SET_GROUP_IMAGE:
      return {
        ...state,
        image: action.image
      };
    case types.SET_PICKER:
      const {key, value} = action;
      const nextState = {};
      nextState[key] = value;
      return {
          ...state, 
          ...nextState
      };
    default:
      return state;
  }
}
