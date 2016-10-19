import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import MenuWrapper from '../components/WrapperComponents/MenuWrapper'

export default class Highscores extends Component {
  render() {
    let terug = require('../images/highscores/terug-knop.png');
    return (
      <MenuWrapper>
          <TouchableHighlight onPress={Actions.home} underlayColor="transparent">
            <Image 
              source={terug} 
              />
          </TouchableHighlight>
      </MenuWrapper>
    )
  }
}

const styles = StyleSheet.create({
});