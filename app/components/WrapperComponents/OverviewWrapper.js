import React, { Component, PropTypes } from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

class OverviewWrapper extends Component {

  render() {
    let overview_bg = require('../../images/overview/bg-overview.jpg');
    return (
      <View>
      	<Image source={overview_bg} style={styles.overview_bg}>
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
});


export default OverviewWrapper;