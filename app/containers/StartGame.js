import React, { Component } from 'react';
import { View, Text, TextInput, Picker, StyleSheet, Image, TouchableHighlight } from 'react-native';
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
                  <Text>De Wuppies</Text>
                  <Text>Route 1 - Groep 3</Text>
                  <View>
                    <Image
                      source={coinbag}
                    />
                    <Text>X 500</Text>
                  </View>
                  <TouchableHighlight underlayColor="transparent">
                    <Image
                      source={buttonSpeelVerder}
                      />
                  </TouchableHighlight>
              </View>

            </View>
            <View style={styles.nieuwSpel}>
              <Image 
                style={styles.nieuwSpelTitel} 
                source={nieuwSpel} 
                />

              <View style={styles.niewSpelBox} >
                <TextInput />

                <Picker
                  selectedValue="java">
                  <Picker.Item label="React Native" value="react-native" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>

                <Picker
                  selectedValue="java">
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>

                <View>
                  <Image 
                    source={placeholderGroepsfoto}
                  />
                  <TouchableHighlight>
                    <Image 
                      source={buttonMaakFoto}
                    />
                  </TouchableHighlight>
                </View>

                <TouchableHighlight>
                  <Image source={buttonBeginHetAvontuur}
                  />
                </TouchableHighlight>
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
    marginTop: 270,
    marginBottom: -320,
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
    paddingRight: 20,
    paddingLeft: 20,
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
    paddingRight: 20,
    paddingLeft: 20,
    width: 234,
    height: 250,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
  },
});