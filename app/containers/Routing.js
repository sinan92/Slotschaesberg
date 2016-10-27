'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import Counter from '../components/counter';
import * as counterActions from '../actions/counterActions';
<<<<<<< HEAD
import * as firebaseActions from '../actions/firebaseRef';
import * as firebaseConf from '../actions/config';
=======
import * as firebaseActions from '../actions/firebaseActions';
>>>>>>> 670fd06e3fda6a0ff6d0b119e9b2bdea44ec22d4
import { connect } from 'react-redux';
import { Router, Scene, Route, ActionConst } from 'react-native-router-flux';
import * as firebase from 'firebase';

// @connect(state => ({
//   state: state.counter
// }))

import Home from './Home';
import Highscores from './Highscores';
import StartGame from './StartGame';
import Introduction from './Introduction';
import Overview from './Overview';

const firebaseConfig = {
  apiKey: "AIzaSyBV9yjCDY9yP4_mtkgu0KSo_2JcQY8X7c4",
  authDomain: "slotschaesberg-fa412.firebaseapp.com",
  databaseURL: "https://slotschaesberg-fa412.firebaseio.com",
  storageBucket: "slotschaesberg-fa412.appspot.com",
  messagingSenderId: "118978765760"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);


class Routing extends Component {
  constructor(props) {
    super(props);

    this.itemsRef = firebaseApp.database().ref('/vragen/');
    this.itemsRef.once('value').then(function(snapshot){ 
      console.log(snapshot.key())
    })
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
    state: [state.firebaseReducer]
  }),
  (dispatch) => ({
    actions: bindActionCreators({...firebaseActions, ...firebaseConf}, dispatch)
  })
)(Routing);
