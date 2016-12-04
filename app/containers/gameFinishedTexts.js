import React, { Component } from 'react';
import { View, ListView, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import IntroWrapper from '../components/WrapperComponents/IntroWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class gameFinishedTexts extends Component {
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
          "tekst" : "We zijn klaar!\nGa nu maar lekker naar de picknickweide om je\ngezonde en lekkere lunch op te eten!",
        },{
          "naam" : "Elisabeth",
          "tekst" : "Maar eerst gaan we naar jullie score\nkijken!",
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
            Actions.gamefinishedpopup();
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
)(gameFinishedTexts);

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