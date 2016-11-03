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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4']),
      tekstNummer: 0,
      toggleCharacter: true,
    };
  }

  render() {
    const {question} = this.props
    let ferdinand = require('../images/introductie/ferdinand.png');
    let elisabeth = require('../images/introductie/elisabeth.png');
    let tekstBallon = require('../images/introductie/tekstballon.png');
    let teksten = [
      {
        "naam" : "Ferdinand",
        "tekst" : "Hey, ik ben Ferdinand!\nLeuk dat jullie erbij zijn!",
      },{
        "naam" : "Elisabeth",
        "tekst" : "En ik ben Elisabeth!\nWelkom in Slot Schaesberg.",
      },{
        "naam" : "Elisabeth",
        "tekst" : "Wij zijn jullie gidsen van vandaag!\nFerdinand zal het spel even kort uitleggen.",
      },{
        "naam" : "Ferdinand",
        "tekst" : "Het zit zo.. We hebben een speurtocht uitgezet\ndoor het hele slot. Onderweg krijgen jullie op\nverschillende plaatsen een aantal vragen.",
      },{
        "naam" : "Ferdinand",
        "tekst" : "Als je deze vragen goed beantwoordt, verdien\nje gouden munten. Als jullie er genoeg\nverdienen krijgen jullie straks een beloning!",
      },{
        "naam" : "Elisabeth",
        "tekst" : "Zoals je ziet is dit de kaart van slot\nSchaesberg. Hierop staan de plekken die\nwe jullie gaan laten zien!",
      },{
        "naam" : "Elisabeth",
        "tekst" : "Tik op een van de nummers om te zien\nwaar je naar toe moet. Ga eerst met je\ngroepje naar START.",
      },{
        "naam" : "Elisabeth",
        "tekst" : "Als je bij de plek bent tik je op het\nnummer en fotografeer je de Schaesplaat.\nDan stellen wij je een vraag!",
      },{
        "naam" : "Ferdinand",
        "tekst" : "Veel succes met de speurtocht en tot zo!",
      },
    ];

    nextScene = () => {
          if(this.state.tekstNummer >= question.teksten.length-1){
            Actions.overview();
          }
          else{
            this.setState({tekstNummer: this.state.tekstNummer+1})
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
    question: store.questions.currentQuestion
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
    marginTop: 20,
    fontSize: 30,
    color: '#89292a',
    fontFamily: 'Chalkboard_bold',
  },
});