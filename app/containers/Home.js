import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DummyComponent from '../components/DummyComponent/DummyComponent'

export default class Home extends Component {
  render() {
    return (
      <View style={{margin: 128}}>
      	<DummyComponent />
        <Text onPress={Actions.highscores}>This is the home page!</Text>
      </View>
    )
  }
}