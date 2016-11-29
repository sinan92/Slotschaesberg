import React, { Component, PropTypes } from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

class GameFinishedWrapper extends Component {

  render() {
    let overview_bg = require('../../images/overview/bg-overview.jpg');
    let ferdinand = require('../../images/einde-popup/ferdinand.png');
    let elisabeth = require('../../images/einde-popup/elisabeth.png');

    return (
      <View>
      	<Image source={overview_bg} style={styles.overview_bg}>
          <Image
            style={styles.ferdinand}
            source={ferdinand} />

          <Image
            style={styles.elisabeth}
            source={elisabeth} />

          <View style={styles.container}>
          	{this.props.children}
          </View>
        </Image>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overview_bg: {
    flex:1,
    resizeMode: 'cover',
  },
  ferdinand: {
    position: 'absolute',
    bottom: 72,
  },
  elisabeth: {
    position: 'absolute',
    bottom: 72,
    right: 0,
  },
});


export default GameFinishedWrapper;