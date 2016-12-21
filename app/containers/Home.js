import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MenuWrapper from '../components/WrapperComponents/MenuWrapper'
import GordijnOmlaag from '../components/WrapperComponents/gordijnOmlaag'
import BarcodeScanner from 'react-native-barcodescanner';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as scoresActions from '../actions/scoresActions';
import * as questionsActions from '../actions/questionsActions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.actions.fetchScores();
    this.props.actions.fetchQuestions();
    console.log("Test")
  }

  componentDidMount(){
    setTimeout(() => {
      this.props.music.backgroundMusic.play()
    }, 0)
    this.props.music.backgroundMusic.setNumberOfLoops(-1)
  }

  render() {
    console.log(this.props)
    let buttonClickSound = this.props.music.buttonClick;

    speelHetSpelKnop = () => {
      buttonClickSound.play()
      Actions.startgame()
    }

    scoresKnop = () => {
      buttonClickSound.play()
      Actions.highscores()
    }

    let speel_het_spel_knop = require('../images/homescreen/button-speel-het-spel.png');
    let beste_spelers_knop = require('../images/homescreen/button-beste-spelers.png');
    return (
      <MenuWrapper>
            <TouchableHighlight onPress={speelHetSpelKnop} underlayColor="transparent">
              <Image 
                style={styles.speel_het_spel_knop} 
                source={speel_het_spel_knop} 
                />
            </TouchableHighlight>
            <TouchableHighlight onPress={scoresKnop} underlayColor="transparent">
              <Image 
                style={styles.beste_spelers_knop} 
                source={beste_spelers_knop} 
                />
            </TouchableHighlight>
      </MenuWrapper>
    )
  }
}

export default connect(store => ({
    scores: store.scorelist.scores,
    music: store.music
  }),
  (dispatch) => ({
    actions: bindActionCreators({...scoresActions, ...questionsActions}, dispatch)
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