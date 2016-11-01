import * as types from './actionTypes';

export function setName(name) {
  return {
    type: types.SET_GROUP_NAME,
    name: name
  };
}

export function setRoute(route) {
  return {
    type: types.SET_GROUP_ROUTE,
    route: route
  };
}

export function addCoins(coins) {
  return {
    type: types.ADD_GROUP_COINS,
    coins: coins
  };
}

export function removeCoins(coins) {
  return {
    type: types.REMOVE_GROUP_COINS,
    coins: coins
  };
}

export function setGroupImage(image) {
  return {
    type: types.SET_GROUP_IMAGE,
    image: image
  };
}

export function setGrade(grade) {
  return {
    type: types.SET_GROUP_GRADE,
    grade: grade
  };
}

export function setPicker(key, value) {
  return {
    type: types.SET_PICKER, 
    key, 
    value
  };
}
