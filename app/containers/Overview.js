import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import OverviewWrapper from '../components/WrapperComponents/OverviewWrapper'

export default class Home extends Component {
  render() {
    let vraag1 = require('../images/overview/cirkel-Vraag1.png');
    let vraag2 = require('../images/overview/cirkel-Vraag2.png');
    let vraag3 = require('../images/overview/cirkel-Vraag3.png');
    let vraag4 = require('../images/overview/cirkel-Vraag4.png');
    let vraag5 = require('../images/overview/cirkel-Vraag5.png');
    let vraag6 = require('../images/overview/cirkel-Vraag6.png');
    let vraag7 = require('../images/overview/cirkel-Vraag7.png');
    let vraag8 = require('../images/overview/cirkel-Vraag8.png');
    return (
      <OverviewWrapper>
          <Image source={vraag1} style={[styles.vraag, styles.vraag1]} />
          <Image source={vraag2} style={[styles.vraag, styles.vraag2]} />
          <Image source={vraag3} style={[styles.vraag, styles.vraag3]} />
          <Image source={vraag4} style={[styles.vraag, styles.vraag4]} />
          <Image source={vraag5} style={[styles.vraag, styles.vraag5]} />
          <Image source={vraag6} style={[styles.vraag, styles.vraag6]} />
          <Image source={vraag7} style={[styles.vraag, styles.vraag7]} />
          <Image source={vraag8} style={[styles.vraag, styles.vraag8]} />
      </OverviewWrapper>
    )
  }
}

const styles = StyleSheet.create({
  vraag:{
    position: 'absolute',
  },
  vraag1: {
    marginTop: 95,
    marginLeft: 390,
  },
  vraag2: {
    marginTop: 80,
    marginLeft: 760,
  },
  vraag3: {
    marginTop: 200,
  },
  vraag4: {
    marginTop: 200,
  },
  vraag5: {
    marginTop: 200,
  },
  vraag6: {
    marginTop: 200,
  },
  vraag7: {
  },
  vraag8: {
  },
});