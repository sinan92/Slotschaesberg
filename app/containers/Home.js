import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MenuWrapper from '../components/WrapperComponents/MenuWrapper'
import { connect } from 'react-redux';
import * as counterActions from '../actions/counterActions';
import {bindActionCreators} from 'redux';

class Home extends Component {
	constructor(props) {
	  super(props);

	  this.state = {};
    const { state, actions } = this.props;
    console.log(this.props);
	}

  render() {
    let speel_het_spel_knop = require('../images/homescreen/button-speel-het-spel.png');
    let beste_spelers_knop = require('../images/homescreen/button-beste-spelers.png');
    return (
      <MenuWrapper>
            <TouchableHighlight onPress={Actions.startgame} underlayColor="transparent">
              <Image 
                style={styles.speel_het_spel_knop} 
                source={speel_het_spel_knop} 
                />
            </TouchableHighlight>
            <TouchableHighlight onPress={Actions.highscores} underlayColor="transparent">
              <Image 
                style={styles.beste_spelers_knop} 
                source={beste_spelers_knop} 
                />
            </TouchableHighlight>
      </MenuWrapper>
    )
  }
}

export default connect(state => ({
    state: state.counter
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(Home);

const styles = StyleSheet.create({
  speel_het_spel_knop: {
    marginTop: 200,
  },
  beste_spelers_knop: {
    marginTop: 100,
  },
});