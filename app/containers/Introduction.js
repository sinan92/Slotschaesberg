import React, { Component } from 'react';
import { View, ListView, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import IntroWrapper from '../components/WrapperComponents/IntroWrapper'

export default class Introduction extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4']),
      tekstNummer: 0,
      toggleCharacter: true,
    };
  }

  render() {
    let ferdinand = require('../images/introductie/ferdinand.png');
    let elisabeth = require('../images/introductie/elisabeth.png');
    let tekstBallon = require('../images/introductie/tekstballon.png');
    let teksten = {
      0:{
        "naam" : "Ferdinand",
        "tekst" : "Hey, ik ben Ferdinand!\nLeuk dat jullie erbij zijn!",
      },
      1:{
        "naam" : "Elisabeth",
        "tekst" : "En ik ben Elisabeth!\nWelkom in Slot Schaesberg.",
      },
      2:{
        "naam" : "Elisabeth",
        "tekst" : "Wij zijn jullie gidsen van vandaag!\nFerdinand zal het spel even kort uitleggen.",
      },
      3:{
        "naam" : "Ferdinand",
        "tekst" : "Het zit zo.. We hebben een speurtocht uitgezet\ndoor het hele slot. Onderweg krijgen jullie op\nverschillende plaatsen een aantal vragen.",
      },
      4:{
        "naam" : "Ferdinand",
        "tekst" : "Als je deze vragen goed beantwoordt, verdien\nje gouden munten. Als jullie er genoeg\nverdienen krijgen jullie straks een beloning!",
      },
      5:{
        "naam" : "Elisabeth",
        "tekst" : "Zoals je ziet is dit de kaart van slot\nSchaesberg. Hierop staan de plekken die\nwe jullie gaan laten zien!",
      },
      6:{
        "naam" : "Elisabeth",
        "tekst" : "Tik op een van de nummers om te zien\nwaar je naar toe moet. Ga eerst met je\ngroepje naar START.",
      },
      7:{
        "naam" : "Elisabeth",
        "tekst" : "Als je bij de plek bent tik je op het\nnummer en fotografeer je de Schaesplaat.\nDan stellen wij je een vraag!",
      },
      8:{
        "naam" : "Ferdinand",
        "tekst" : "Veel succes met de speurtocht en tot zo!",
      },
    };

    nextScene = () => {
          if(this.state.tekstNummer >= Object.keys(teksten).length-1){
            console.log("Naar volgende scene gaan");
          }
          else{
            this.setState({tekstNummer: this.state.tekstNummer+1})
          }
        };

    return (
      <IntroWrapper>
          <View style={styles.container}>
            <Image style={styles.karakter}source={teksten[this.state.tekstNummer].naam == 'Ferdinand' ? ferdinand : elisabeth} />
            <TouchableHighlight onPress={nextScene} underlayColor="transparent">
              <Image style={styles.tekstBallon} source={tekstBallon}>
                <Text style={[styles.tekstBallonTekst, styles.tekstBallonTitel]}>{teksten[this.state.tekstNummer].naam}</Text>
                <Text style={styles.tekstBallonTekst}>
                    {teksten[this.state.tekstNummer].tekst}
                </Text>
              </Image>
            </TouchableHighlight>
          </View>
      </IntroWrapper>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    bottom: 72,
    position: 'absolute',
    zIndex: 0,
  },
  tekstBallon:{
    marginTop: 130,
    zIndex: 100,
  },
  karakter:{
    marginRight: -50,
  },
  tekstBallonTekst:{
    marginLeft: 80,
    fontFamily: 'Chalkboard',
    fontSize: 25,
    color: 'black',
  },
  tekstBallonTitel:{
    marginTop: 20,
    fontSize: 30,
    color: '#89292a',
    fontFamily: 'Chalkboard_bold',
  },
});