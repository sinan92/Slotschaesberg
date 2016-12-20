import React, { Component, PropTypes } from 'react';
import {Text, View, StyleSheet, Image, Animated} from 'react-native';

class GordijnOmlaag extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0)
  }

  render() {
    let picture = require('../../images/gordijn/gordijn.png')
    const gordijn = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300]
    })

    return (
      <View>
      	<Animated.Image source={picture} style={[styles.overview_bg, {transform: [{scale: gordijn}]}]} />
      </View>);
  }
}

const styles = StyleSheet.create({
  overview_bg: {
    flex:1,
    resizeMode: 'contain',
    marginTop: -1860,
    zIndex: 100,
  },
});


export default GordijnOmlaag;