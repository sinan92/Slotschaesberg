'use strict';

import React, {Component} from 'react';
import { Router, Scene, Route, ActionConst } from 'react-native-router-flux';

import Home from './Home';
import Highscores from './Highscores';
import StartGame from './StartGame';
import Introduction from './Introduction';
import Overview from './Overview';

export default class Routing extends Component {
  render() {
    return (
      <Router>
        <Scene hideNavBar="true" key="root">
          <Scene key="home" component={Home} passProps initial={true} animation="false" duration='0' />
          <Scene key="startgame" component={StartGame} animation="false" duration='0' />
          <Scene key="highscores" component={Highscores} animation="false" duration='0' />
          <Scene key="introduction" component={Introduction} animation="false" duration='0' />
          <Scene key="overview" component={Overview} animation="false" duration='0' />
        </Scene>
      </Router>
    )
  }
}
