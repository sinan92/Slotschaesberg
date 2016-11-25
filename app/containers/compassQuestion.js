import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Animated, PanResponder } from 'react-native';
import { Actions } from 'react-native-router-flux';
import OverviewWrapper from '../components/WrapperComponents/OverviewWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as groupActions from '../actions/groupActions';
import * as questionsActions from '../actions/questionsActions';
import QuestionIntroWrapper from '../components/WrapperComponents/QuestionIntroWrapper'
import shuffle from 'shuffle-array'

class expressionsQuestion extends Component {
  constructor(props) {
    super(props);

    const {question, actions} = this.props
    let answers = []
    let pans = []
    let showDraggables = []
    let richtingen = [{naam: 'Noord', goed: 0}, {naam: 'Oost', goed: 1}, {naam: 'Zuid', goed: 2}, {naam: 'West', goed: 3}]
    console.log(question.currentQuestion.antwoorden)
    for(let i=0; i < richtingen.length; i++){
      answers.push({'goed' : richtingen.length+1}) //Niet bestaand default invoeren
      pans.push(new Animated.ValueXY())
      showDraggables.push(true)
    }
    
    actions.initAnswers(answers)

    let j = Array(richtingen.length).fill().map((_, i) => i)
    j = shuffle(j)

    this.state = {
      tipTaken: false,
      showDraggable   : showDraggables,
      dropZoneValues  : null,
      pan             : pans,
      panResponders   : null,
      currentDraggable: null,
      richtingen      : richtingen,
      randomize       : j,
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
                    showDraggable : draggables,
                    currentDraggable: number,
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
    for(let i=0; i < this.state.richtingen.length; i++){
      panResponders.push(this.panResponder(i, this.state.showDraggable))
    }

    this.setState({panResponders: panResponders})
  }

  componentDidMount(){
    setTimeout(() => {
        let dropZonesArray = []
        console.log(this.dropZones.values())
        Array.from(this.dropZones.values())
          .forEach(dropZone => {
            dropZone.measure((ox, oy, width, height, px, py) => {
              dropZonesArray.push({x: px, y:py, height: height, width: width, zone: dropZone.props.zone})
            })
          })
          this.setState({dropZoneValues: dropZonesArray})
    }, 0); 
  }

  isDropZone(gesture){
      const {actions} = this.props
      var dropZone = this.state.dropZoneValues;
      let isDropZone = false;
      Array.from(dropZone)
        .forEach(dz => {
          if(!isDropZone){
            isDropZone = gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height && gesture.moveX > dz.x && gesture.moveX < dz.x + dz.width;
            if(isDropZone){
              switch(dz.zone){
                case 0:
                  setTimeout(() => {
                    actions.setAnswer(this.state.currentDraggable, 0)
                    console.log(this.state.currentDraggable)
                  }, 0); 
                  break;
                case 1:
                  setTimeout(() => {
                    actions.setAnswer(this.state.currentDraggable, 1)
                    console.log(this.state.currentDraggable)
                  }, 0); 
                  break;
                case 2:
                  setTimeout(() => {
                    actions.setAnswer(this.state.currentDraggable, 2)
                    console.log(this.state.currentDraggable)
                  }, 0); 
                  break;
                case 3:
                  setTimeout(() => {
                    actions.setAnswer(this.state.currentDraggable, 3)
                    console.log(this.state.currentDraggable)
                  }, 0); 
                  break;
                default:
                  console.log("No dropzone")
              }
            }
          }
        })

      return isDropZone
  }

  renderDraggable(){
    let j = this.state.randomize;
    let checkboxes = []
    console.log(j)
    for(let i=0; i < j.length; i++){
        checkboxes.push(
            <View key={i} style={styles.draggableContainer}>
                <Animated.View 
                    {...this.state.panResponders[j[i]].panHandlers}
                    style={this.state.pan[j[i]].getLayout()}>
                    <Text style={styles.sleepVragen} id={j[i]}>{this.state.richtingen[j[i]].naam}</Text>
                </Animated.View>
            </View>
        )

    }
      return checkboxes

  }


  renderDropZones(){
    let sleepVeld = require('../images/sleep-vraag-kompas/veld-kompas.png');
    let dropZones = []
    let dropZoneStyles = [styles.noord, styles.oost, styles.zuid, styles.west]
    for(let i=0;i<this.state.richtingen.length;i++){
            dropZones.push(
                  <Image
                    key={i}
                    ref={c => this.dropZones.set(i, c)}
                    zone={i} 
                    style={[dropZoneStyles[i], styles.richtingen]} 
                    source={sleepVeld} />
              )
      }

      return dropZones
  }

  render() {
    const {group, question, actions} = this.props

    checkAnswer = () => {
      //Vergelijk antwoorden
      let answer = true;
      console.log(this.state.richtingen)
      console.log(question.chosenAnswers)
      for(let i=0; i < this.state.richtingen.length; i++){
        if(this.state.richtingen[i].goed != question.chosenAnswers[i].goed){
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

    let vraagTitel = require('../images/sleep-vraag-spreekwoorden/banner-vraag.png');
    let locatieAfbeelding = require('../images/vraag-popup/locatie.jpg');
    let knop = require('../images/Meerkeuze/knop.png');
    let kompas = require('../images/sleep-vraag-kompas/kompasvraag.png');
    this.dropZones = new Map()

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
                <Text style={styles.vraagStellingTekst}>Zet de antwoorden bij de juiste spreekwoorden</Text>
              </View>

              <View style={styles.spreekwoorden}>

                <View style={styles.antwoordenBox}>
                  <View style={styles.antwoorden}>
                      {this.renderDraggable()}
                  </View>
                </View>

                <View style={styles.dropBoxen}>
                    {this.renderDropZones()}
                    <Image style={styles.kompas} source={kompas}></Image>
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
)(expressionsQuestion);

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
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Chalkboard',
    fontSize: 40,
  },
  vraagBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginLeft: 2,
    paddingRight: 30,
    paddingLeft: 30,
    width: 783,
    height: 590,
  },
  tipAftrek:{
    marginTop: 40,
    marginLeft: 50,
    fontSize: 18,
    fontFamily: "Chalkboard",
    color: 'white',
  },
  vraagStelling:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  vraagStellingTekst:{
    fontFamily: "Gerstner BQ_bold",
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
  },
  spreekwoorden:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  antwoordLabel:{
    fontFamily: "Chalkboard",
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
  },
  antwoordenBox:{
    flexDirection: 'row',
  },
  antwoorden:{
    marginTop: 42,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 200,
    marginLeft: 50,
  },
  gevondenKnop:{
    marginBottom: 10,
    alignItems: 'center',
  },
  spreekwoordenContainer:{
    alignItems: 'center',
  },
  dropBoxen:{
    flexDirection: 'column',
    height: 300,
    width: 400,
  },
  richtingen:{
    position: 'absolute',
  },
  noord:{
    left: 87,
    top: -40,
  },
  oost:{
    top: 125,
    left: 290,
  },
  zuid:{
    left: 87,
    top: 290,
  },
  west:{
    top: 125,
    left: -120,
  },
  kompas:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  sleepVragen:{
    backgroundColor: '#fee9bf',
    height: 44,
    fontFamily: "Chalkboard_bold",
    fontSize: 17,
    textAlign: 'center',
    color: 'black',
    borderColor: '#ba4123',
    borderWidth: 3,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    zIndex: 100,
  },
});