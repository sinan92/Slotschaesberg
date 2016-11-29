import React, { Component, PropTypes } from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

class LocatieWrapper extends Component {
  render() {
    let pictures = [
              require('../../images/locaties/Toegangspoort.jpg'), //0
              require('../../images/locaties/Bezoekerscentrum.jpg'), //1
              require('../../images/locaties/Ambachtendorp.jpg'), //2
              require('../../images/locaties/Toren.jpg'), //3
              require('../../images/locaties/Kelders.jpg'), //4
              require('../../images/locaties/Historische tuin.jpg'), //5
              require('../../images/locaties/Slotgracht.jpg'), //6
              require('../../images/locaties/Plein.jpg') //7
              ]
              console.log(this.props.image)

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