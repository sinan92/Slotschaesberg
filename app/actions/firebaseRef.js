import * as types from './actionTypes';

export function setFirebaseRef(ref) {
  return {
    type: 'FIREBASE_REF_SET',
    value: ref
  };
}