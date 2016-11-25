import React, { Component } from 'react';
import { View, ListView, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import IntroWrapper from '../components/WrapperComponents/IntroWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as questionsActions from '../actions/questionsActions';

class answeredQuestion extends Component {
  constructor(props) {
    super(props);


    console.log(this.props.status)
  }

  render() {
    const {actions, question} = this.props
    let ferdinand = require('../images/introductie/ferdinand.png');
    let elisabeth = require('../images/introductie/elisabeth.png');
    let tekstBallon = require('../images/introductie/tekstballon.png');
    let teksten = [
      {
        "naam" : "Elisabeth",
        "tekst" : "Goed gedaan!",
      },{
        "naam" : "Ferdinand",
        "tekst" : "Helaas, het antwoord is fout.",
      },
    ];   
    let tekstNummer = this.props.status == true ? 0 : 1 

    _onPress = () => {
          if(tekstNummer){
            Actions.pop() //Fout beantwoord, terug naar vraag
          }
          else{
            actions.completedQuestion(question.vraag_nr)
            Actions.questioncompleted() //Vraag goed beantwoord, doorgaan
          }
        };

    return (
      <IntroWrapper>
          <View style={styles.container}>
            <Image style={styles.karakter}source={teksten[tekstNummer].naam == 'Ferdinand' ? ferdinand : elisabeth} />
            <TouchableHighlight onPress={_onPress} underlayColor="transparent">
              <Image style={styles.tekstBallon} source={tekstBallon}>
                <Text style={[styles.tekstBallonTekst, styles.tekstBallonTitel]}>{teksten[tekstNummer].naam}</Text>
                <Text style={styles.tekstBallonTekst}>
                    {teksten[tekstNummer].tekst}
                </Text>
              </Image>
            </TouchableHighlight>
          </View>
      </IntroWrapper>
    )
  }

}

export default connect(store => ({
    question: store.questions.currentQuestion
  }),
  (dispatch) => ({
    actions: bindActionCreators(questionsActions, dispatch)
  })
)(answeredQuestion);

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    bottom: 72,
    position: 'absolute',
    zIndex: 0,
  },
  tekstBallon:{
    marginTop: 130,
    zIndex: 100,
  },
  karakter:{
    marginRight: -50,
  },
  tekstBallonTekst:{
    marginLeft: 80,
    fontFamily: 'Chalkboard',
    fontSize: 25,
    color: 'black',
  },
  tekstBallonTitel:{
    marginBottom: -15,
    fontSize: 30,
    color: '#89292a',
    fontFamily: 'Chalkboard_bold',
  },
});