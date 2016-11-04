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
import multipleChoice from './multipleChoice';
import timer from './timer';

export default class Routing extends Component {
  render() {
    return (
      <Router>
        <Scene hideNavBar="true" key="root">
          <Scene type="reset" key="home" initial={true} component={Home} passProps animation="false" duration='0' />
          <Scene type="reset" key="startgame" component={StartGame} animation="false" duration='0' />
          <Scene type="reset" key="highscores" component={Highscores} animation="false" duration='0' />
          <Scene type="reset" key="introduction" component={Introduction} animation="false" duration='0' />
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
          <Scene type="reset" key="multiplechoice" component={multipleChoice} animation="false" duration='0' />
          <Scene type="reset" key="timer" component={timer} animation="false" duration='0' />
        </Scene>
      </Router>
    )
  }
}
