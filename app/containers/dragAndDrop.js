import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import OverviewWrapper from '../components/WrapperComponents/OverviewWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as groupActions from '../actions/groupActions';
import * as questionsActions from '../actions/questionsActions';
import QuestionIntroWrapper from '../components/WrapperComponents/QuestionIntroWrapper'
import FruitGroenten from '../components/fruitGroenten'
import {
  DragContainer,
  Draggable,
  DropZone
} from '../lib/DragAndDrop'

class MyDropZoneContent extends Component {
  componentWillReceiveProps({dragOver}) {
    if (dragOver !== this.props.dragOver) LayoutAnimation.easeInEaseOut();
  }
  render() {
    return <View style={{width: this.props.dragOver ? 110 : 100, height:  this.props.dragOver ? 110 : 100, backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center'}}>
      <View>
        <Text>{"LET GO"}</Text>
      </View>
    </View>
  }
}


class DeleteZone extends Component {
  componentWillReceiveProps({dragOver}) {
    if (dragOver !== this.props.dragOver) LayoutAnimation.easeInEaseOut();
  }
  render() {
    return <View style={{top: this.props.dragOver ? 0: -100, height: 100, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
      <View>
        <Text>{'DELETE'}</Text>
      </View>
    </View>
  }
}

class DraggyInner extends Component {
  render() {
    if (this.props.dragOver && !this.props.ghost && !this.props.dragging) {
      return <View style={{height: 100, width: 100, backgroundColor: 'green'}} />
    }
    let shadows = {shadowColor: 'black', shadowOffset: {width: 0, height: 20}, shadowOpacity: .5, shadowRadius: 20, opacity: .5};
    return <View style={[{height: 100, width: 100, backgroundColor: this.props.ghost ? '#777' : '#777'}, this.props.dragging ? shadows : null]} />
  }
}


class Draggy extends Component {
  render() {
    return <Draggable data="Whatevs" style={{margin: 7.5}}>
        <DropZone>
          <DraggyInner />
        </DropZone>
    </Draggable>
  }
}

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
            <FruitGroenten key={i} id={i} text={question.currentQuestion.antwoorden[i].antwoord} checked={false} />
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
                <Text style={styles.vraagStellingTekst}>Sorteer de groenten en het fruit!</Text>
              </View>

              <View style={styles.dropBoxen}>
<DragContainer>
        <DropZone style={{position: 'absolute', top: 0, left: 0, right: 0, height: 100}} onDrop={() => Alert.alert('DELETE!!!')}>
          <DeleteZone />
        </DropZone>
        <View style={{flex: 1, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
             <DropZone onDrop={e => Alert.alert("Dropped it on area 1")}>
              <MyDropZoneContent />
            </DropZone>
            <DropZone onDrop={e => Alert.alert("Dropped it on area 2")}>
              <MyDropZoneContent />
            </DropZone>
          </View>
            <View style={{height: 115}}>
              <ScrollView horizontal={true}>
              <View style={{justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row'}}>
                <Draggy />
                <Draggy />
                <Draggy />
                <Draggy />
                <Draggy />
                <Draggy />
                <Draggy />
              </View>
              </ScrollView>
            </View>
        </DragContainer>
              </View>

              <View style={styles.antwoordenBox}>
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
});