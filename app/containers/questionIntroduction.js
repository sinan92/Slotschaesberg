import React, { Component } from 'react';
import { View, ListView, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import QuestionIntroWrapper from '../components/WrapperComponents/QuestionIntroWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as questionsActions from '../actions/questionsActions';

class questionIntroduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tekstNummer: 0,
      toggleCharacter: true,
      ferdinandGroet: false,
      elisabethGroet: false,
    };
  }

  componentDidMount(){
    this.karakterGeluidAfspelen()
  }

  karakterGeluidAfspelen(){
    const {question, music} = this.props
    setTimeout(() => {
      if(this.state.ferdinandGroet == false || this.state.elisabethGroet == false){
        let karakterGeluidFerdinand = question.teksten[this.state.tekstNummer].karakter_id == "1"

        if(karakterGeluidFerdinand){
          music.ferdinandGreet.play()
          this.setState({ferdinandGroet: true})
        }
        else{
          music.elisabethGreet.play()
          this.setState({elisabethGroet: true})
        }
      }
    }, 0); 
  }

  render() {
    const {question, music} = this.props
    let ferdinand = require('../images/introductie/ferdinand.png');
    let elisabeth = require('../images/introductie/elisabeth.png');
    let tekstBallon = require('../images/introductie/tekstballon.png');

    //Sound effects
    let buttonClickSound = music.buttonClick

    nextScene = () => {
        buttonClickSound.play()
        if(this.state.tekstNummer >= question.teksten.length-1){
          if(question.vraag_soort === "Meerkeuze"){
            Actions.question()
          }
          else if(question.vraag_soort === "Open vraag"){
            Actions.openquestion()
          }
          else if(question.vraag_soort === "Timer"){
            Actions.timer()
          }
          else if(question.vraag_soort === "Drag and drop"){
            Actions.draganddrop()
          }
          else if(question.vraag_soort === "Spreekwoorden"){
            Actions.spreekwoorden()
          }
          else if(question.vraag_soort === "Kompas"){
            Actions.kompas()
          }
        }
        else{
          this.setState({tekstNummer: this.state.tekstNummer+1})
          this.karakterGeluidAfspelen()
        }
    };

    return (
      <QuestionIntroWrapper>
          <View style={styles.container}>
            <Image style={styles.karakter}source={question.teksten[this.state.tekstNummer].karakter_id == "1" ? ferdinand : elisabeth} />
            <TouchableHighlight onPress={nextScene} underlayColor="transparent">
              <Image style={styles.tekstBallon} source={tekstBallon}>
                <Text style={[styles.tekstBallonTekst, styles.tekstBallonTitel]}>{question.teksten[this.state.tekstNummer].karakter_id == "1" ? "Ferdinand" : "Elisabeth"}</Text>
                <Text style={styles.tekstBallonTekst}>
                    {question.teksten[this.state.tekstNummer].tekst}
                </Text>
              </Image>
            </TouchableHighlight>
          </View>
      </QuestionIntroWrapper>
    )
  }

}

export default connect(store => ({
    question: store.questions.currentQuestion,
    music: store.music,
  }),
  (dispatch) => ({
    actions: bindActionCreators(questionsActions, dispatch)
  })
)(questionIntroduction);

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