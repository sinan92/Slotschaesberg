'use strict';

import React, {Component} from 'react';
import { Router, Scene, Route, ActionConst, Modal } from 'react-native-router-flux';

import Home from './Home';
import Highscores from './Highscores';
import StartGame from './StartGame';
import Introduction from './Introduction';
import Overview from './Overview';
import Camera from './Camera';
import QRCodeScanner from './QRCodeScanner';
import modalQuestionOverview from './modalQuestionOverview';
import questionIntroduction from './questionIntroduction';

export default class Routing extends Component {
  render() {
    return (
      <Router>
        <Scene hideNavBar="true" key="root">
          <Scene key="home" initial={true} component={Home} passProps animation="false" duration='0' />
          <Scene key="startgame" component={StartGame} animation="false" duration='0' />
          <Scene key="highscores" component={Highscores} animation="false" duration='0' />
          <Scene key="introduction" component={Introduction} animation="false" duration='0' />
          <Scene key="overview" component={Modal} animation="false" duration='0'>
            <Scene key="overviewPage" component={Overview} animation="false" duration='0' />
            <Scene key="modalquestionoverview" component={modalQuestionOverview} animation="false" duration='0' />
          </Scene>
          <Scene key="camera" component={Camera} animation="false" duration='0' />
          <Scene key="qrcodescanner" component={QRCodeScanner} animation="false" duration='0' />
          <Scene key="questionintroduction" component={questionIntroduction} animation="false" duration='0' />
        </Scene>
      </Router>
    )
  }
}
