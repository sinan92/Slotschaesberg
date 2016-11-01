import React, { Component } from 'react';
import { View, Text, TextInput, Picker, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MenuWrapper from '../components/WrapperComponents/MenuWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as groupActions from '../actions/groupActions';
import Camera from 'react-native-camera';

class StartGame extends Component {


  render() {
    const { group, actions } = this.props;
    let buttonBeginHetAvontuur = require('../images/speel-het-spel/button-begin-het-avontuur.png');
    let buttonMaakFoto = require('../images/speel-het-spel/button-maak-foto.png');
    let buttonSpeelVerder = require('../images/speel-het-spel/button-speel-verder.png');
    let coinbag = require('../images/speel-het-spel/coinbag.png');
    let lijn = require('../images/speel-het-spel/lijn.png');
    let nieuwSpel = require('../images/speel-het-spel/nieuw-spel.png');
    let placeholderGroepsfoto = require('../images/speel-het-spel/placeholder-groepsfoto.png');
    let verderSpelen = require('../images/speel-het-spel/verder-spelen.png');
    let besteSpelersKnop = require('../images/homescreen/button-beste-spelers.png');

    toIntroduction = () => {
      console.log(this.props);
      //Actions.introduction();
    }

    takePicture = () => {
      Actions.camera();
    }

    return (
      <MenuWrapper>
          <View style={styles.topView}>
            <View style={styles.verderSpelen}>
              <Image 
                style={styles.verderSpelenTitel} 
                source={verderSpelen} 
                />

              <View style={styles.verderSpelenBox} > 
                  <Text style={styles.hoofdTekst}>{group.name}</Text>
                  <Text style={styles.statusTekst}>Route {group.route} - Groep {group.grade}</Text>
                  <View style={styles.muntenZak}>
                    <Image
                      source={coinbag}
                    />
                    <Text style={styles.muntenZakTekst}>x {group.coins}</Text>
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
                  onChangeText={(text) => actions.setName(text)}
                  value={group.name}
                  />

                <Picker
                  style={[styles.inputFields, styles.pickerBox]}
                  selectedValue={group.grade} 
                  onValueChange={this.onValueChange.bind(this, 'grade')}>
                  <Picker.Item label="Kies een groep" value="kies-groep" />
                  <Picker.Item label="Groep 1" value="1" />
                  <Picker.Item label="Groep 2" value="2" />
                  <Picker.Item label="Groep 3" value="3" />
                  <Picker.Item label="Groep 4" value="4" />
                  <Picker.Item label="Groep 5" value="5" />
                  <Picker.Item label="Groep 6" value="6" />
                  <Picker.Item label="Groep 7" value="7" />
                  <Picker.Item label="Groep 8" value="8" />
                </Picker>

                <Picker
                  style={[styles.inputFields, styles.pickerBox]}
                  selectedValue={group.route}
                  onValueChange={this.onValueChange.bind(this, 'route')}>
                  <Picker.Item label="Kies een route" value="kies-route" />
                  <Picker.Item label="Route 1" value="1" />
                  <Picker.Item label="Route 2" value="2" />
                  <Picker.Item label="Route 3" value="3" />
                </Picker>

                <View style={styles.fotoView} >
                  <Image 
                    style={styles.fotoImage}
                    source={placeholderGroepsfoto}
                  />
                  <TouchableHighlight onPress={takePicture}>
                    <Image 
                      style={styles.fotoButton}
                      source={buttonMaakFoto}
                    />
                  </TouchableHighlight>
                </View>

                <TouchableHighlight onPress={toIntroduction} underlayColor="transparent">
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


  onValueChange = (key: string, value: string) => {
    const { group, actions } = this.props;
    const newState = {};
    newState[key] = value;
    actions.setPicker(key, value);
  };
}

export default connect(store => ({
    group: store.group
  }),
  (dispatch) => ({
    actions: bindActionCreators(groupActions, dispatch)
  })
)(StartGame);

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
    fontFamily: 'Gerstner BQ_bold',
    textAlign: 'center',
  },
  statusTekst: {
    paddingTop: 5,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    fontFamily: 'Gerstner BQ_bold',
    fontSize: 12,
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
    fontFamily: 'Chalkboard_bold',
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