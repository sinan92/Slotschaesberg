'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import Counter from '../components/counter';
import * as counterActions from '../actions/counterActions';
import { connect } from 'react-redux';
import { Router, Scene, Route, ActionConst } from 'react-native-router-flux';

// @connect(state => ({
//   state: state.counter
// }))

import Home from './Home';
import Highscores from './Highscores';
import StartGame from './StartGame';
import Introduction from './Introduction';
import Overview from './Overview';

var config = {
  apiKey: "AIzaSyBV9yjCDY9yP4_mtkgu0KSo_2JcQY8X7c4",
  authDomain: "slotschaesberg-fa412.firebaseapp.com",
  databaseURL: "https://slotschaesberg-fa412.firebaseio.com",
  storageBucket: "slotschaesberg-fa412.appspot.com",
  messagingSenderId: "118978765760"
};
var ref = new Firebase(config.firebaseRef);

var actions = bindActionCreators(/* ... */);
actions.setFirebaseRef(ref);

class Routing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Scene hideNavBar="true" key="root">
          <Scene key="home" component={Home} initial={true} animation="false" duration='0' />
          <Scene key="startgame" component={StartGame} animation="false" duration='0' />
          <Scene key="highscores" component={Highscores} animation="false" duration='0' />
          <Scene key="introduction" component={Introduction} animation="false" duration='0' />
          <Scene key="overview" component={Overview} animation="false" duration='0' />
        </Scene>
      </Router>
    )
  }
}

export default connect(state => ({
    state: state.counter
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(Routing);
