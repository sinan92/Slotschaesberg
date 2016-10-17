/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
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
        <Scene key="root">
          <Scene key="home" component={Home} initial={true} />
          <Scene key="highscores" component={Highscores} title="highscores" />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('SlotSchaesbergApp', () => SlotSchaesbergApp);
