/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Router, Scene, Route } from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Home from './app/containers/Home';
import Highscores from './app/containers/Highscores';

export default class SlotSchaesbergApp extends Component {
  render() {
    return (
      <Router>
        <Scene hideNavBar="true" key="root">
          <Scene key="home" component={Home} initial={true} animation="fade" />
          <Scene key="highscores" component={Highscores} title="highscores" animation="fade" />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('SlotSchaesbergApp', () => SlotSchaesbergApp);