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
                  <Text style={styles.hoofdTekst}>De Wuppies</Text>
                  <Text style={styles.statusTekst}>Route 1 - Groep 3</Text>
                  <View style={styles.muntenZak}>
                    <Image
                      source={coinbag}
                    />
                    <Text style={styles.muntenZakTekst}>x 500</Text>
                  </View>
                  <TouchableHighlight underlayColor="transparent">
                    <Image
                      source={buttonSpeelVerder}
                      />
                  </TouchableHighlight>
              </View>

            </View>
            <View>
              <Image 
                source={nieuwSpel} 
                />

              <View style={styles.niewSpelBox} >  
                <TextInput 
                  style={[styles.inputFields, styles.teamNaamInvoer]} 
                  placeholder="Teamnaam" 
                  placeholderTextColor="#717171" 
                  underlineColorAndroid="#e5e5e5" 
                  />

                <Picker
                  style={[styles.inputFields, styles.pickerBox]}
                  selectedValue="java">
                  <Picker.Item label="React Native" value="react-native" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>

                <Picker
                  style={[styles.inputFields, styles.pickerBox]}
                  selectedValue="java">
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>

                <View style={styles.fotoView} >
                  <Image 
                    style={styles.fotoImage}
                    source={placeholderGroepsfoto}
                  />
                  <TouchableHighlight>
                    <Image 
                      style={styles.fotoButton}
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
    marginBottom: -300,
    height: 500,

  },
  verderSpelen: {
    marginRight: 50,
  },
  verderSpelenBox: {
    backgroundColor: 'white',
    marginTop: -10,
    marginLeft: 46,
    paddingRight: 20,
    paddingLeft: 20,
    width: 234,
    height: 190,
  },
  hoofdTekst: {
    paddingBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusTekst: {
    paddingTop: 5,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  muntenZak: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  muntenZakTekst: {
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  niewSpelBox: {
    backgroundColor: 'white',
    marginTop: -10,
    marginLeft: 20,
    paddingRight: 20,
    paddingLeft: 20,
    width: 234,
    height: 280,
  },
  inputFields: {
    marginBottom: 10,
    backgroundColor: '#e5e5e5',
    height: 35,
    color: '#717171',
    borderRadius: 10,
  },
  teamNaamInvoer: {
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  pickerBox: {
  },
  fotoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  fotoImage: {

  },
  fotoButton: {

  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
  },
});