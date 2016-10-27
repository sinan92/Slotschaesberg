'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import Counter from '../components/counter';
import * as counterActions from '../actions/counterActions';
import { connect } from 'react-redux';
import { Router, Scene, Route, ActionConst } from 'react-native-router-flux';

import Home from './Home';
import Highscores from './Highscores';
import StartGame from './StartGame';
import Introduction from './Introduction';
import Overview from './Overview';

class Routing extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  componentDidMount(){
    //const { state, actions } = this.props;
    //console.log(state.count);
  }

  render() {
    const { state, actions } = this.props;

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

export default connect(state => ({
    state: state.counter
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(Routing);
