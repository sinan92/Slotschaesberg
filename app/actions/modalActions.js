import * as types from './actionTypes';

export function toggleVisibility() {
  return {
    type: types.TOGGLE_VISIBILITY,
  };
}

export function enableVisibility() {
  return {
    type: types.ENABLE_VISIBILITY,
  };
}

export function disableVisibility() {
  return {
    type: types.DISABLE_VISIBILITY,
  };
}