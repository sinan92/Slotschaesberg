import * as types from '../actions/actionTypes';
import Sound from 'react-native-sound';

const initialState = {
  backgroundMusic: new Sound('medieval_background_loop_one_flute.mp3', Sound.MAIN_BUNDLE),
  buttonClick: new Sound('button.mp3', Sound.MAIN_BUNDLE),
  timerFinished: new Sound('timerafgelopen.mp3', Sound.MAIN_BUNDLE),
  ferdinandGreet: new Sound('ferdinand.mp3', Sound.MAIN_BUNDLE),
  elisabethGreet: new Sound('elisabeth.mp3', Sound.MAIN_BUNDLE),
  newQuestion: new Sound('nieuwevraag.mp3', Sound.MAIN_BUNDLE),
  correctAnswer: new Sound('vraaggoed.mp3', Sound.MAIN_BUNDLE),
  coins: new Sound('coins.mp3', Sound.MAIN_BUNDLE),
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOGGLE_BACKGROUND_MUSIC:
      return {
        ...state,
        backgroundMusic: !state.backgroundMusic
      };
    default:
      return state;
  }
}