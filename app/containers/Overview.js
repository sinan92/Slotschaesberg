import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import OverviewWrapper from '../components/WrapperComponents/OverviewWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as groupActions from '../actions/groupActions';
import * as modalActions from '../actions/modalActions';
import * as questionsActions from '../actions/questionsActions';

class Overview extends Component {
  constructor(props) {
    super(props);
  
    console.log(this.props.questions.completedQuestions)
  }

  render() {
    const {questions, group, actions} = this.props;
    let vraag1 = require('../images/overview/start.png');
    let vraag2 = require('../images/overview/cirkel-Vraag2.png');
    let vraag3 = require('../images/overview/cirkel-Vraag3.png');
    let vraag4 = require('../images/overview/cirkel-Vraag4.png');
    let vraag5 = require('../images/overview/cirkel-Vraag5.png');
    let vraag6 = require('../images/overview/cirkel-Vraag6.png');
    let vraag7 = require('../images/overview/cirkel-Vraag7.png');
    let vraag8 = require('../images/overview/cirkel-Vraag8.png');
    let afgerond = require('../images/overview/vraag-afgerond.png');
    let naamBg = require('../images/overview/naam-bg.png');
    let coinBg = require('../images/overview/cointotaal-placeholder.png');
    let munt = require('../images/overview/munt.png');
    let stylesArray = [styles.toegangspoort, styles.bezoekerscentrum, 
                       styles.ambachtendorp, styles.toren, 
                       styles.kelders, styles.historischetuin, 
                       styles.slotgracht, styles.plein
                      ]
    let vragen = [vraag1,
                   vraag2,
                   vraag3,
                   vraag4,
                   vraag5,
                   vraag6,
                   vraag7,
                   vraag8
    ]
    let vraag_nrs = [questions.questions[1].vraag_nr,
                      questions.questions[2].vraag_nr,
                      questions.questions[3].vraag_nr,
                      questions.questions[4].vraag_nr,
                      questions.questions[5].vraag_nr,
                      questions.questions[6].vraag_nr,
                      questions.questions[7].vraag_nr,
                      questions.questions[8].vraag_nr
                    ]
    
    const openQuestionOverview = (index) => {
        Actions.modalquestionoverview();
        actions.toggleVisibility();
        actions.getQuestion(index);
    }

    let completedQuestionsCount = 1;
    for(let i = 1;i < questions.completedQuestions.length; i++){
      if(questions.completedQuestions[i] == true){
        completedQuestionsCount = completedQuestionsCount + 1
      }
    }

    //Alle vragen af
    if(completedQuestionsCount === questions.completedQuestions.length){
      Actions.gamefinishedtexts();
    }

    let vragenItems = []
    for(let i=0; i < completedQuestionsCount; i++){
      let currentIndex = i
      let imageSource = vragen[vraag_nrs[i]-1]
      if(questions.completedQuestions[i+1]){
        imageSource = afgerond
      }

      vragenItems.push(
            <TouchableHighlight underlayColor="transparent" key={i} onPress={() => openQuestionOverview(currentIndex+1)} style={[styles.punt, stylesArray[i]]}>
                <Image source={imageSource} />
            </TouchableHighlight>
      )
    }

    return (
      <OverviewWrapper>
          <View style={styles.statusBox}>
            <Image source={{uri: group.image}} style={styles.profile} />
            <Image source={naamBg} style={styles.naamBg}>
              <Text style={styles.profileText}>{group.name}</Text>
            </Image>
            <Image source={coinBg} style={styles.coinBg}>
              <Image
                style={styles.coinBgImage}
                source={munt} />
              <Text style={styles.coinBgTekst}>
                  x {group.coins}
              </Text>
            </Image>
          </View>

          
          {vragenItems}

      </OverviewWrapper>
    )
  }
}

export default connect(store => ({
    group: store.group,
    modal: store.modal,
    questions: store.questions,
  }),
  (dispatch) => ({
    actions: bindActionCreators({...groupActions, ...modalActions, ...questionsActions}, dispatch)
  })
)(Overview);

const styles = StyleSheet.create({
  profile:{
    width: 250,
    height: 200,
  },
  profileText:{
    marginTop: 7,
    color: 'white',
    fontSize: 28,
    fontFamily: 'Gerstner BQ',
    textAlign: 'center',
  },
  statusBox: {
    position: 'absolute',
    right: 0,
    flex: 1,
    flexDirection: 'column',
  },
  naamBg:{
    marginBottom: 20,
  },
  coinBg:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 50,
  },
  coinBgTekst:{
    marginLeft: 5,
    fontSize: 25,
    fontFamily: 'Chalkboard',
    color: 'black',
  },
  punt:{
    position: 'absolute',
  },
  toren: {
    marginTop: 95,
    marginLeft: 390,
  },
  ambachtendorp: {
    marginTop: 80,
    marginLeft: 760,
  },
  slotgracht: {
    marginTop: 360,
    marginLeft: 105,
  },
  plein: {
    marginTop: 495,
    marginLeft: 470,
  },
  historischetuin: {
    marginTop: 220,
    marginLeft: 890,
  },
  bezoekerscentrum: {
    marginTop: 460,
    marginLeft: 840,
  },
  toegangspoort: {
    marginTop: 650,
    marginLeft: 780,
  },
  kelders: {
    marginTop: 290,
    marginLeft: 550,
  },
});