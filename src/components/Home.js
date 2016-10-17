import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  button: {
    top: 10
  }
});


const Home = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Welcome to react-native-redux-starter!</Text>
    <TouchableHighlight style={styles.button} underlayColor="gray" onPress={Actions.login}>
      <Text>Click here to go to Login screen</Text>
    </TouchableHighlight>
  </View>
);

export default Home;
