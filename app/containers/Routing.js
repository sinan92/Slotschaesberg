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
import question from './question';
import tip from './tip';
import answeredQuestion from './answeredQuestion';
import questionCompleted from './questionCompleted';
import openQuestion from './openQuestion';
import timer from './timer';
import dragAndDrop from './dragAndDrop';
import expressionsQuestion from './expressionsQuestion';
import kompas from './compassQuestion';

export default class Routing extends Component {
  render() {
    return (
      <Router>
        <Scene hideNavBar="true" key="root">
          <Scene type="reset" key="home" component={Home} passProps animation="false" duration='0' />
          <Scene type="reset" key="startgame" component={StartGame} animation="false" duration='0' />
          <Scene type="reset" key="highscores" component={Highscores} animation="false" duration='0' />
          <Scene type="reset" key="introduction" initial={true} component={Introduction} animation="false" duration='0' />
          <Scene type="reset" key="overview" component={Modal} animation="false" duration='0'>
            <Scene key="overviewPage" component={Overview} animation="false" duration='0' />
            <Scene key="modalquestionoverview" component={modalQuestionOverview} animation="false" duration='0' />
          </Scene>
          <Scene type="reset" key="camera" component={Camera} animation="false" duration='0' />
          <Scene type="reset" key="qrcodescanner" component={QRCodeScanner} animation="false" duration='0' />
          <Scene type="reset" key="questionintroduction" component={questionIntroduction} animation="false" duration='0' />
          <Scene type="reset" key="question" component={question} animation="false" duration='0' />
          <Scene type="reset" key="tip" component={tip} animation="false" duration='0' />
          <Scene type="reset" key="answeredquestion" component={answeredQuestion} animation="false" duration='0' />
          <Scene type="reset" key="questioncompleted" component={questionCompleted} animation="false" duration='0' />
          <Scene type="reset" key="openquestion" component={openQuestion} animation="false" duration='0' />
          <Scene type="reset" key="timer" component={timer} animation="false" duration='0' />
          <Scene type="reset" key="draganddrop" component={dragAndDrop} animation="false" duration='0' />
          <Scene type="reset" key="spreekwoorden" component={expressionsQuestion} animation="false" duration='0' />
          <Scene type="reset" key="kompas" component={kompas} animation="false" duration='0' />
        </Scene>
      </Router>
    )
  }
}
