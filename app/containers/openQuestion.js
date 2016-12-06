import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import OverviewWrapper from '../components/WrapperComponents/OverviewWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as groupActions from '../actions/groupActions';
import * as questionsActions from '../actions/questionsActions';
import QuestionIntroWrapper from '../components/WrapperComponents/QuestionIntroWrapper'
import Checkbox from '../components/checkbox'

class multipleChoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tipTaken: false,
    }
  }

  render() {
    const {group, question, actions, music} = this.props

    //Sound effects
    let buttonClickSound = music.buttonClick

    checkAnswer = () => {
        buttonClickSound.play()
        actions.addCoins(parseInt(question.reward))
        Actions.answeredquestion({status: true})
    }

    let vraagTitel = require('../images/vraag-popup/banner-vraag.png');
    let locatieAfbeelding = require('../images/vraag-popup/locatie.jpg');
    let boom = require('../images/vraag-popup/schaesplaatboom.jpg');
    let knop = require('../images/Meerkeuze/knop.png');
    let munt = require('../images/overview/munt.png');
    let tip = require('../images/Meerkeuze/tip.png');

    getTip = () => {
      buttonClickSound.play()
      Actions.tip()
      if(!this.state.tipTaken){
        actions.reduceReward(5)
        this.setState({tipTaken: true})
      }
    }

    let tips = null
    console.log(question.currentQuestion)
    if(question.currentQuestion.tip != '' || question.currentQuestion.tip_afbeeldingen != undefined){
      tips = <View style={styles.tip}>
                  <TouchableHighlight onPress={getTip} underlayColor="transparent">
                    <Image
                      source={tip}>
                      <Text style={styles.tipAftrek}>-5</Text>
                    </Image>
                  </TouchableHighlight>
                </View>
    }


    return (
        <QuestionIntroWrapper>
          <View style={styles.vraag}>
            <Image 
              source={vraagTitel} 
            >
              <View style={styles.vraagTekst}>
                <Text style={styles.vraagTitel}>Vraag {question.currentQuestion.vraag_nr}</Text>
              </View>
            </Image>

            <View style={styles.vraagBox} > 
              <View style={styles.vraagStelling}>
                <Text style={styles.vraagStellingTekst}>{question.currentQuestion.vraag}</Text>
              </View>

              <View style={styles.status}>
                <View>
                    <Text style={styles.beloningLabel}>Beloning</Text>

                    <View style={styles.beloning}>
                      <Image
                        source={munt} />

                      <Text style={styles.beloningTekst}>x {question.currentQuestion.beloning}</Text>
                    </View>
                </View>
                {tips}
              </View>

              <View style={styles.antwoordenBox}>
                <Text style={styles.antwoordLabel}>Open vraag!</Text>
                <View>
                  <Text style={styles.antwoorden}>
                  Probeer zo veel mogelijk
                  antwoorden te verzinnen!
                  </Text>
                </View>
              </View>

              <View style={styles.gevondenKnop}>
                <TouchableHighlight onPress={checkAnswer} underlayColor="transparent">
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
    group: store.group,
    music: store.music,
  }),
  (dispatch) => ({
    actions: bindActionCreators({...questionsActions, ...groupActions}, dispatch)
  })
)(multipleChoice);

const styles = StyleSheet.create({
  vraag: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 70,
  },
  vraagTekst: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  vraagTitel: {
    flex: 0.90,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Chalkboard',
    fontSize: 40,
  },
  vraagKruis: {
    flex: 0.10,
    marginRight: 100,
    textAlign: 'left',
    color: 'white',
    fontFamily: 'Chalkboard_bold',
    fontSize: 40,
  },
  vraagBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginLeft: 2,
    paddingRight: 30,
    paddingLeft: 30,
    width: 530,
    height: 590,
  },
  tipAftrek:{
    marginTop: 40,
    marginLeft: 50,
    fontSize: 18,
    fontFamily: "Chalkboard",
    color: 'white',
  },
  status:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingRight: 80,
    paddingLeft: 80,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
    borderTopColor: '#e5e5e5',
    borderTopWidth: 1,
  },
  beloningLabel:{
    fontFamily: "Chalkboard",
    fontSize: 24,
    color: 'black',
  },
  beloning:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  beloningTekst:{
    marginLeft: 5,
    fontFamily: "Chalkboard",
    fontSize: 24,
    color: 'black',
  },
  vraagStelling:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  vraagStellingTekst:{
    marginBottom: 10,
    fontFamily: "Gerstner BQ",
    fontSize: 20,
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
    fontFamily: "Chalkboard",
    color: 'black',
  },
  gevondenKnop:{
    marginBottom: 10,
    alignItems: 'center',
  },
});