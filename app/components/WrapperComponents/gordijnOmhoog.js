import React, { Component, PropTypes } from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

class GordijnOmhoog extends Component {
  render() {
    let picture = require('../../images/gordijn/gordijn.png')

    return (
      <View>
      	<Image source={picture} style={styles.overview_bg} />
      </View>);
  }
}

const styles = StyleSheet.create({
  overview_bg: {
    flex:1,
    resizeMode: 'cover',
    zIndex: 10000,
  },
});


export default GordijnOmhoog;