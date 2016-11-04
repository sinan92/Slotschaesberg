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

class question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tipTaken: false,
    };

    const {question, actions} = this.props
    let answers = []
    for(let i=0; i < question.currentQuestion.antwoorden.length; i++){
      answers.push({'goed' : '0'})
    }
    actions.initAnswers(answers)
  }

  render() {
    const {group, question, actions} = this.props

    checkAnswer = () => {
      let answer = true;
      for(let i=0; i < question.currentQuestion.antwoorden.length; i++){
        if(question.currentQuestion.antwoorden[i].goed != question.chosenAnswers[i].goed){
          answer = false
        }
      }
      if(answer){
        //Goed beantwoord
        actions.addCoins(parseInt(question.reward))
        Actions.answeredquestion({status: true})
      }
      else{
        //Fout beantwoord
        actions.reduceReward(question.reward)
        Actions.answeredquestion({status: false})
      }
    }

    getTip = () => {
      Actions.tip()
      if(!this.state.tipTaken){
        actions.reduceReward(5)
        this.setState({tipTaken: true})
      }
    }

    let vraagTitel = require('../images/vraag-popup/banner-vraag.png');
    let locatieAfbeelding = require('../images/vraag-popup/locatie.jpg');
    let boom = require('../images/vraag-popup/schaesplaatboom.jpg');
    let knop = require('../images/Meerkeuze/knop.png');
    let munt = require('../images/overview/munt.png');
    let tip = require('../images/Meerkeuze/tip.png');

    let checkboxes = []
    console.log(question)
    for(let i=0; i < question.currentQuestion.antwoorden.length; i++){
      checkboxes.push(
            <Checkbox key={i} id={i} text={question.currentQuestion.antwoorden[i].antwoord} checked={false} />
      )
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

                <View>
                  <TouchableHighlight onPress={getTip} underlayColor="transparent">
                    <Image
                      source={tip}>
                      <Text style={styles.tipAftrek}>-5</Text>
                    </Image>
                  </TouchableHighlight>
                </View>
              </View>

              <View style={styles.antwoordenBox}>
                <Text style={styles.antwoordLabel}>Antwoord</Text>
                <View style={styles.antwoorden}>
                  {checkboxes}
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
  }),
  (dispatch) => ({
    actions: bindActionCreators({...questionsActions, ...groupActions}, dispatch)
  })
)(question);

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
    justifyContent: 'space-between',
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
    marginTop: 120,
    alignItems: 'center',
  },
});