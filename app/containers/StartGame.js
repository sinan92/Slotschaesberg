import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MenuWrapper from '../components/WrapperComponents/MenuWrapper'

export default class StartGame extends Component {
  render() {
    let buttonBeginHetAvontuur = require('../images/speel-het-spel/button-begin-het-avontuur.png');
    let buttonMaakFoto = require('../images/speel-het-spel/button-maak-foto.png');
    let buttonSpeelVerder = require('../images/speel-het-spel/button-speel-verder.png');
    let coinbag = require('../images/speel-het-spel/coinbag.png');
    let lijn = require('../images/speel-het-spel/lijn.png');
    let nieuwSpel = require('../images/speel-het-spel/nieuw-spel.png');
    let placeholderGroepsfoto = require('../images/speel-het-spel/placeholder-groepsfoto.png');
    let verderSpelen = require('../images/speel-het-spel/verder-spelen.png');
    let besteSpelersKnop = require('../images/homescreen/button-beste-spelers.png');

    return (
      <MenuWrapper>
          <View style={styles.topView}>
            <View style={styles.verderSpelen}>
              <Image 
                style={styles.verderSpelenTitel} 
                source={verderSpelen} 
                />
              <View style={styles.verderSpelenBox} >

              </View>
            </View>
            <View style={styles.nieuwSpel}>
              <Image 
                style={styles.nieuwSpelTitel} 
                source={nieuwSpel} 
                />
              <View style={styles.niewSpelBox} >

              </View>
            </View>
          </View>
          <View style={styles.bottomView}>
            <TouchableHighlight onPress={Actions.highscores} underlayColor="transparent">
              <Image 
                source={besteSpelersKnop} 
                />
            </TouchableHighlight>
          </View>
      </MenuWrapper>
    )
  }
}

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 300,
    marginBottom: -340,
    height: 500,

  },
  verderSpelen: {
    marginRight: 50,

  },
  verderSpelenTitel: {

  },
  verderSpelenBox: {
    backgroundColor: 'white',
    marginLeft: 46,
    width: 234,
    height: 200,
  },
  nieuwSpel: {

  },
  nieuwSpelTitel: {

  },
  niewSpelBox: {
    backgroundColor: 'white',
    marginLeft: 20,
    width: 234,
    height: 200,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
  },
});