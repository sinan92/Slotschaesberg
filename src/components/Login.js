import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const Login = () => (
  <View style={styles.container}>
    <TouchableHighlight underlayColor="white" onPress={() => alert("Successfully looged in!")}>
      <Text>Login</Text>
    </TouchableHighlight>
  </View>
);

export default Login;