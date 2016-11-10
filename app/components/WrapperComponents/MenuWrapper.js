import React, { Component, PropTypes } from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

class MenuWrapper extends Component {

  render() {
    let home_bg = require('../../images/homescreen/home-bg.jpg');
    let ferdinand = require('../../images/homescreen/home-ferdinand.png');
    let elisabeth = require('../../images/homescreen/home-elisabeth.png');
    return (
      <View>
      	<Image source={home_bg} style={styles.home_bg}>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  home_bg: {
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


export default MenuWrapper;