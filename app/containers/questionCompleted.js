import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Animated } from 'react-native';
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
      bounceValue: new Animated.Value(0),
    }
  }

  componentWillReceiveProps(nextProps){
    nextProps.music.correctAnswer.play()
  }

  componentDidMount() {
    let g = this.props.music.coins

    setTimeout(() => {
      g.play()
      this.state.bounceValue.setValue(1.2);     // Start large
      Animated.spring(                          // Base: spring, decay, timing
        this.state.bounceValue,                 // Animate `bounceValue`
        {
          toValue: 1,                           // Animate to smaller size
          friction: 1,                          // Bouncier spring
        }
      ).start();                                // Start the animation
    }, 1000);
  }

  render() {
    const {group, question, actions, music} = this.props

    let box = require('../images/voltooid-popup/banner-voltooid.png');
    let zak = require('../images/voltooid-popup/muntenzak.png');
    let knop = require('../images/voltooid-popup/button-voltooid.png');
    let munt = require('../images/voltooid-popup/munt.png');

    //Sound effects
    let buttonClickSound = music.buttonClick

    backToMap = () => {
      buttonClickSound.play()
      Actions.overview()
    }

    return (
        <QuestionIntroWrapper>
          <View style={styles.vraag}>
            <Image
              source={box}>
              <View style={styles.content}>
                <View style={styles.muntenzak}>
                  <Animated.Image source={zak} 
                    style={{
                            flex: 1,
                            transform: [                        // `transform` is an ordered array
                              {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
                            ]
                          }} 
                      />
                  <Text style={styles.muntenzakTekst}> x {group.coins}</Text>
                </View>

                <View style={styles.munt}>
                  <Animated.Image source={munt} 
                    style={{
                            flex: 1,
                            transform: [                        // `transform` is an ordered array
                              {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
                            ]
                          }} 
                      />
                  <Text style={styles.muntenzakTekst}> x {question.reward}</Text>
                </View>
              </View>

              <View style={styles.knop}>
                <TouchableHighlight onPress={backToMap} underlayColor="transparent">
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
    music: store.music,
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