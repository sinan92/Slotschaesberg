import * as types from './actionTypes';

export function setName(name) {
  return {
    name: name
  };
}

export function setRoute(route) {
  return {
    route: route
  };
}

export function addCoins(coins) {
  return {
    coins: coins
  };
}

export function removeCoins(coins) {
  return {
    coins: coins
  };
}

export function setProfileImage(image) {
  return {
    image: image
  };
}

export function setClass(grade) {
  return {
    grade: grade
  };
}
