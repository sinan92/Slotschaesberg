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

class expressionsQuestion extends Component {
  constructor(props) {
    super(props);

    const {question, actions} = this.props
    let answers = []
    let pans = []
    let showDraggables = []
    for(let i=0; i < question.currentQuestion.antwoorden.length; i++){
      answers.push({'goed' : '2'})
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
      currentDraggable: null,
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
    for(let i=0; i < question.currentQuestion.antwoorden.length; i++){
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
          console.log(dropZonesArray)
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
              if(dz.zone == "fruit"){
                setTimeout(() => {
                  actions.setAnswer(this.state.currentDraggable, 1)
                  console.log(this.state.currentDraggable)
                }, 0); 
              }
              else{
                setTimeout(() => {
                  actions.setAnswer(this.state.currentDraggable, 0)
                  console.log(this.state.currentDraggable)
                }, 0); 
              }
            }
          }
        })

      return isDropZone
  }

  renderDraggable(){
    const {question} = this.props

    let checkboxes = []
    for(let i=0; i < question.currentQuestion.antwoorden.length; i++){
        checkboxes.push(
            <View key={i} style={styles.draggableContainer}>
                <Animated.View 
                    {...this.state.panResponders[i].panHandlers}
                    style={this.state.pan[i].getLayout()}>
                    <FruitGroenten id={i} text={question.currentQuestion.antwoorden[i].antwoord} />
                </Animated.View>
            </View>
        )

    }
      return checkboxes
  }

  render() {
    const {group, question, actions} = this.props

    checkAnswer = () => {
      //Vergelijk antwoorden
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

    let vraagTitel = require('../images/sleep-vraag-spreekwoorden/banner-vraag.png');
    let locatieAfbeelding = require('../images/vraag-popup/locatie.jpg');
    let boom = require('../images/vraag-popup/schaesplaatboom.jpg');
    let knop = require('../images/Meerkeuze/knop.png');
    let fruitKrat = require('../images/sleep-vraag-fruit/krat-fruit.png');
    let sleepVeld = require('../images/sleep-vraag-spreekwoorden/sleep-veld.png');
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
                      <Text style={styles.sleepVragen}>Zij zijn het tegenovergestelde</Text>
                      <Text style={styles.sleepVragen}>De nood wordt groot</Text>
                      <Text style={styles.sleepVragen}>Het is onzinnig werk</Text>
                  </View>
                </View>

                <View style={styles.dropBoxen}>
                    <View style={styles.spreekwoordenContainer}>
                      <Text style={styles.sleepVeldTekst}>Het is water en vuur</Text>
                      <Image 
                          ref={c => this.dropZones.set(0, c)}
                          zone='0'
                          style={styles.sleepVeld}
                          source={sleepVeld}>
                      </Image>
                    </View>

                    <View style={styles.spreekwoordenContainer}>
                      <Text style={styles.sleepVeldTekst}>Het water komt aan de lippen</Text>
                      <Image 
                          ref={c => this.dropZones.set(1, c)}
                          zone='1'
                          style={styles.sleepVeld}
                          source={sleepVeld}>
                      </Image>
                    </View>

                    <View style={styles.spreekwoordenContainer}>
                      <Text style={styles.sleepVeldTekst}>Het is water naar de zee dragen</Text>
                      <Image 
                          ref={c => this.dropZones.set(1, c)}
                          zone='2'
                          style={styles.sleepVeld}
                          source={sleepVeld}>
                      </Image>
                    </View>
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
  },
  gevondenKnop:{
    marginBottom: 10,
    alignItems: 'center',
  },
  dropBoxen:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 300,
  },
  spreekwoordenContainer:{
    alignItems: 'center',
  },
  sleepVeld:{

  },
  sleepVeldTekst:{
    fontFamily: "Chalkboard_bold",
    fontSize: 17,
    color: 'black',
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
  },
});