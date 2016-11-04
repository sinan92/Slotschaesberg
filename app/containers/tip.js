import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import OverviewWrapper from '../components/WrapperComponents/OverviewWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as groupActions from '../actions/groupActions';
import * as modalActions from '../actions/modalActions';
import * as questionsActions from '../actions/questionsActions';
import QuestionIntroWrapper from '../components/WrapperComponents/QuestionIntroWrapper'
import Checkbox from '../components/checkbox'

class tip extends Component {
  render() {
    const {question, actions} = this.props
    console.log(question)

    let vraagTitel = require('../images/tip/banner-tip.png');
    let locatieAfbeelding = require('../images/vraag-popup/locatie.jpg');
    let knop = require('../images/tip/button-tip.png');
    let munt = require('../images/overview/munt.png');
    let tip = require('../images/Meerkeuze/tip.png');

    return (
        <QuestionIntroWrapper>
          <View style={styles.vraag}>
            <Image 
              source={vraagTitel} 
            >
            </Image>

            <View style={styles.vraagBox} > 
              <View style={styles.vraagStelling}>
                <Text style={styles.vraagStellingTekst}>{question.currentQuestion.vraag}</Text>
              </View>

              <View style={styles.tipView}>
                <Text style={styles.tipText}>{question.currentQuestion.tip}</Text>
              </View>

              <View style={styles.gevondenKnop}>
                <TouchableHighlight onPress={Actions.pop} underlayColor="transparent">
                  <Image source={knop}></Image>
                </TouchableHighlight>
              </View>

            </View>

          </View>
        </QuestionIntroWrapper>
    )
  }
}

export default connect(store => ({
    question: store.questions,
  }),
  (dispatch) => ({
    actions: bindActionCreators({...questionsActions}, dispatch)
  })
)(tip);

const styles = StyleSheet.create({
  vraag: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 70,
  },
  vraagBox: {
    flexDirection: 'column',
    backgroundColor: 'white',
    marginLeft: 2,
    paddingRight: 30,
    paddingLeft: 30,
    width: 530,
    height: 320,
  },
  tipView:{
    borderTopColor: '#e5e5e5',
    borderTopWidth: 1,
    paddingTop: 20,
  },
  tipText:{
    textAlign: 'center',
    fontFamily: "Chalkboard",
    fontSize: 18,
    color: 'black',
  },
  vraagStelling:{
    justifyContent: 'center',
    paddingBottom: 20,
    alignItems: 'center',
  },
  vraagStellingTekst:{
    marginBottom: 10,
    fontFamily: "Gerstner BQ_bold",
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
  },
  antwoordLabel:{
    fontFamily: "Chalkboard",
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
  },
  antwoordenBox:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  antwoorden:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 100,
  },
  gevondenKnop:{
    marginTop: 50,
    alignItems: 'center',
  },
});