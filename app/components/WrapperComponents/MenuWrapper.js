import React, { Component, PropTypes } from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

class MenuWrapper extends Component {

  render() {
    let home_bg = require('../../images/homescreen/home-bg.jpg');
    return (
      <View>
      	<Image source={home_bg} style={styles.home_bg}>
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
});


export default MenuWrapper;