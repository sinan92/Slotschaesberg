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
    const {question, actions, music} = this.props
    console.log(question)

    let vraagTitel = require('../images/tip/banner-tip.png');
    let locatieAfbeelding = require('../images/vraag-popup/locatie.jpg');
    let knop = require('../images/tip/button-tip.png');
    let munt = require('../images/overview/munt.png');
    let tip = require('../images/Meerkeuze/tip.png');
    let afbeeldingen = 
                  {
                    blaadje: [
                      require('../images/tips/blaadjes-tip.jpg')
                    ],
                    planten: [
                      require('../images/tips/theekruidentip.jpg')
                    ],
                    bokkenrijders: [
                      require('../images/tips/route1-niveau1-vraag4.png')
                    ],
                    meten: [
                      require('../images/tips/route2-niveau2-vraag5.png')
                    ]
                  }
                

    //Sound effects
    let buttonClickSound = music.buttonClick

    closeTip = () => {
      buttonClickSound.play()
      Actions.pop()
    }
    let tips = <Text style={styles.tipText}>{question.currentQuestion.tip}</Text>
          console.log(afbeeldingen[question.currentQuestion.tip_afbeeldingen])

    if(question.currentQuestion.tip == '' && question.currentQuestion.tip_afbeeldingen != undefined){
          tips = <Image source={afbeeldingen[question.currentQuestion.tip_afbeeldingen][0]} />
    }

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
                {tips}
              </View>

              <View style={styles.gevondenKnop}>
                <TouchableHighlight onPress={closeTip} underlayColor="transparent">
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
    music: store.music,
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
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginLeft: 2,
    paddingRight: 30,
    paddingLeft: 30,
    width: 530,
  },
  tipView:{
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1,
  },
  vraagStellingTekst:{
    marginBottom: 10,
    fontFamily: "Gerstner BQ_bold",
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
  },
  gevondenKnop:{
    marginBottom: 10,
    alignItems: 'center',
  },
});