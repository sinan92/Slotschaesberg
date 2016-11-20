import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Animated, PanResponder } from 'react-native';
import { Actions } from 'react-native-router-flux';
import OverviewWrapper from '../components/WrapperComponents/OverviewWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as groupActions from '../actions/groupActions';
import * as questionsActions from '../actions/questionsActions';
import QuestionIntroWrapper from '../components/WrapperComponents/QuestionIntroWrapper'
import FruitGroenten from '../components/fruitGroenten'

class question extends Component {
  constructor(props) {
    super(props);

    const {question, actions} = this.props
    let answers = []
    let pans = []
    let showDraggables = []
    for(let i=0; i < question.currentQuestion.antwoorden.length; i++){
      answers.push({'goed' : '0'})
      pans.push(new Animated.ValueXY())
      showDraggables.push(true)
    }
    
    actions.initAnswers(answers)

    this.state = {
      tipTaken: false,
      showDraggable   : showDraggables,
      dropZoneValues  : null,
      pan             : pans,
      panResponders   : null,
    };
  }

  componentWillMount(){
    const {question, actions} = this.props
    this.panResponder = (number, draggables) => PanResponder.create({
        onStartShouldSetPanResponder    : () => true,
        onPanResponderMove              : Animated.event([null,{
            dx  : this.state.pan[number].x,
            dy  : this.state.pan[number].y
        }]),
        onPanResponderRelease           : (e, gesture) => {
            if(this.isDropZone(gesture)){
                this.setState({
                    showDraggable : draggables
                });
            }else{
                Animated.spring(
                    this.state.pan[number],
                    {toValue:{x:0,y:0}}
                ).start();
            }
        }
    });

    let panResponders = []
    for(let i=0; i < question.currentQuestion.antwoorden.length; i++){
      panResponders.push(this.panResponder(i), this.state.showDraggable)
    }
    console.log(panResponders)
    console.log(this.state.panResponders)
    this.setState({panResponders: "panResponders"})
    console.log(this.state.panResponders)
  }

  isDropZone(gesture){
      var dz = this.state.dropZoneValues;
      return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }

  setDropZoneValues(event){
      this.setState({
          dropZoneValues : event.nativeEvent.layout
      });
  }

  renderDraggable(){
    const {question} = this.props

    let checkboxes = []
    console.log(this.state.panResponders)
    for(let i=0; i < question.currentQuestion.antwoorden.length; i++){
      if(this.state.showDraggable[i]){
        checkboxes.push(
            <View key={i} style={styles.draggableContainer}>
                <Animated.View 
                    //{...this.state.panResponders[i].panHandlers}
                    style={this.state.pan[i].getLayout()}>
                    <FruitGroenten id={i} text={question.currentQuestion.antwoorden[i].antwoord} />
                </Animated.View>
            </View>
        )
      }

      return checkboxes
    }
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
                <Text style={styles.vraagStellingTekst}>Sorteer de groenten en het fruit!</Text>
              </View>

              <View style={styles.dropBoxen}>
                <View style={styles.mainContainer}>
                    <View 
                        onLayout={this.setDropZoneValues.bind(this)}
                        style={styles.dropZone}>
                        <Text style={styles.text}>Drop me here!</Text>
                    </View>

                </View>
              </View>

              <View style={styles.antwoordenBox}>
                <View style={styles.antwoorden}>
                    {this.renderDraggable()}
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
    marginBottom: 10,
    alignItems: 'center',
  },
  mainContainer: {
      flex    : 1
  },
  dropZone    : {
      height  : 100,
      backgroundColor:'#2c3e50'
  },
  text        : {
      marginTop   : 25,
      marginLeft  : 5,
      marginRight : 5,
      textAlign   : 'center',
      color       : '#fff'
  },
});