/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Router, Scene, Route, ActionConst } from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Home from './app/containers/Home';
import Highscores from './app/containers/Highscores';
import StartGame from './app/containers/StartGame';
import Introduction from './app/containers/Introduction';
import Overview from './app/containers/Overview';

export default class SlotSchaesbergApp extends Component {
  render() {
    return (
      <Router>
        <Scene hideNavBar="true" key="root">
          <Scene key="home" component={Overview} initial={true} animation="false" duration='0' />
          <Scene key="startgame" component={StartGame} animation="false" duration='0' />
          <Scene key="highscores" component={Highscores} animation="false" duration='0' />
          <Scene key="introduction" component={Introduction} animation="false" duration='0' />
          <Scene key="overview" component={Overview} animation="false" duration='0' />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('SlotSchaesbergApp', () => SlotSchaesbergApp);