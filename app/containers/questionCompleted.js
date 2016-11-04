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
  render() {
    const {group, question, actions} = this.props



    let box = require('../images/voltooid-popup/banner-voltooid.png');
    let zak = require('../images/voltooid-popup/muntenzak.png');
    let knop = require('../images/voltooid-popup/button-voltooid.png');
    let munt = require('../images/overview/munt.png');


    return (
        <QuestionIntroWrapper>
          <View style={styles.vraag}>
            <Image
              source={box}>
              <View style={styles.content}>
                <View style={styles.muntenzak}>
                  <Image source={zak} />
                  <Text style={styles.muntenzakTekst}> x {group.coins}</Text>
                </View>

                <View style={styles.munt}>
                  <Image source={munt} />
                  <Text style={styles.muntenzakTekst}> x {question.reward}</Text>
                </View>
              </View>

              <View style={styles.knop}>
                <TouchableHighlight onPress={Actions.overview}>
                  <Image source={knop} />
                </TouchableHighlight>
              </View>
            </Image>
            
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
  content:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 320,
    marginLeft: 160,
    width: 400,
  },
  muntenzak:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  muntenzakTekst:{
    fontFamily: 'Chalkboard',
    fontSize: 18,
    color: 'black',
  },
  munt:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 130,
  },
  knop:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});