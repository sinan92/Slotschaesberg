import React, { Component } from 'react';
import { View, ListView, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import IntroWrapper from '../components/WrapperComponents/IntroWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class Introduction extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4']),
      tekstNummer: 0,
      toggleCharacter: true,
      ferdinandGroet: false,
      elisabethGroet: false,
      teksten: [
      {
        "naam" : "Ferdinand",
        "tekst" : "Hey, ik ben Ferdinand!\nLeuk dat jullie erbij zijn!",
      },{
        "naam" : "Elisabeth",
        "tekst" : "En ik ben Elisabeth!\nWelkom in Slot Schaesberg.",
      },{
        "naam" : "Elisabeth",
        "tekst" : "Wij zijn jullie gidsen van vandaag!\nFerdinand zal het spel even kort uitleggen.",
      },{
        "naam" : "Ferdinand",
        "tekst" : "Het zit zo.. We hebben een speurtocht uitgezet\ndoor het hele slot. Onderweg krijgen jullie op\nverschillende plaatsen een aantal vragen.",
      },{
        "naam" : "Ferdinand",
        "tekst" : "Als je deze vragen goed beantwoordt, verdien\nje gouden munten. Als jullie er genoeg\nverdienen krijgen jullie straks een beloning!",
      },{
        "naam" : "Elisabeth",
        "tekst" : "Zoals je ziet is dit de kaart van slot\nSchaesberg. Hierop staan de plekken die\nwe jullie gaan laten zien!",
      },{
        "naam" : "Elisabeth",
        "tekst" : "Tik op een van de nummers om te zien\nwaar je naar toe moet. Ga eerst met je\ngroepje naar START.",
      },{
        "naam" : "Elisabeth",
        "tekst" : "Als je bij de plek bent tik je op het\nnummer en fotografeer je het schild.\nDan stellen wij je een vraag!",
      },{
        "naam" : "Ferdinand",
        "tekst" : "Veel succes met de speurtocht en tot zo!",
      },
    ]
    };
  }

  componentDidMount(){
    this.karakterGeluidAfspelen()
  }

  karakterGeluidAfspelen(){
    setTimeout(() => {
      if(this.state.ferdinandGroet == false || this.state.elisabethGroet == false){
        let karakterGeluidFerdinand = this.state.teksten[this.state.tekstNummer].naam == 'Ferdinand'

        if(karakterGeluidFerdinand){
          this.props.music.ferdinandGreet.play()
          this.setState({ferdinandGroet: true})
        }
        else{
          this.props.music.elisabethGreet.play()
          this.setState({elisabethGroet: true})
        }
      }
    }, 0); 
  }

  render() {
    let ferdinand = require('../images/introductie/ferdinand.png');
    let elisabeth = require('../images/introductie/elisabeth.png');
    let tekstBallon = require('../images/introductie/tekstballon.png');

    //Sound effects
    let buttonClickSound = this.props.music.buttonClick;

    nextScene = () => {
          buttonClickSound.play()
          if(this.state.tekstNummer >= this.state.teksten.length-1){
            Actions.overview();
          }
          else{
            this.setState({tekstNummer: this.state.tekstNummer+1})
            this.karakterGeluidAfspelen()
          }
        };

    return (
      <IntroWrapper>
          <View style={styles.container}>
            <Image style={styles.karakter}source={this.state.teksten[this.state.tekstNummer].naam == 'Ferdinand' ? ferdinand : elisabeth} />
            <TouchableHighlight onPress={nextScene} underlayColor="transparent">
              <Image style={styles.tekstBallon} source={tekstBallon}>
                <Text style={[styles.tekstBallonTekst, styles.tekstBallonTitel]}>{this.state.teksten[this.state.tekstNummer].naam}</Text>
                <Text style={styles.tekstBallonTekst}>
                    {this.state.teksten[this.state.tekstNummer].tekst}
                </Text>
              </Image>
            </TouchableHighlight>
          </View>
      </IntroWrapper>
    )
  }

}

export default connect(store => ({
    music: store.music,
  })
)(Introduction);

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
    marginBottom: -15,
    fontSize: 30,
    color: '#89292a',
    fontFamily: 'Chalkboard_bold',
  },
});