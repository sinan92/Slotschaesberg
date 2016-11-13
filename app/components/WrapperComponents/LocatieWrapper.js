import React, { Component, PropTypes } from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

class LocatieWrapper extends Component {
  render() {
    let pictures = [require('../../images/locaties/placeholder.png')]

    return (
      <View>
      	<Image source={pictures[this.props.image]} style={styles.overview_bg}>
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


export default LocatieWrapper;