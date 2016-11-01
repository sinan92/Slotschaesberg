import * as types from '../actions/actionTypes';

const initialState = {
  name: null,
  route: null,
  grade: null,
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
    case types.SET_GROUP_ROUTE:
      return {
        ...state,
        route: action.route
      };
    case types.ADD_GROUP_COINS:
      return {
        ...state,
        coins: state.count + action.coins
      };
    case types.REMOVE_GROUP_COINS:
      return {
        ...state,
        coins: state.count - action.coins
      };
    case types.SET_GROUP_IMAGE:
      return {
        ...state,
        image: action.image
      };
    case types.SET_GROUP_GRADE:
      return {
        ...state,
        grade: action.grade
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
