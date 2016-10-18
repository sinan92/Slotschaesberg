import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MenuWrapper from '../components/WrapperComponents/MenuWrapper'

export default class Highscores extends Component {
  render() {
    let home_bg = require('../images/homescreen/home-bg.jpg');
    let terug = require('../images/homescreen/button-speel-het-spel.png');
    return (
      <MenuWrapper>
          <TouchableHighlight onPress={Actions.home} underlayColor="transparent">
            <Image 
              style={styles.beste_spelers_knop} 
              source={terug} 
              />
          </TouchableHighlight>
      </MenuWrapper>
    )
  }
}

const styles = StyleSheet.create({
  beste_spelers_knop: {

  },
});