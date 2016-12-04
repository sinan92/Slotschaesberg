import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, NetInfo } from 'react-native';
import { Actions } from 'react-native-router-flux';
import GameFinishedWrapper from '../components/WrapperComponents/GameFinishedWrapper'
import OverviewWrapper from '../components/WrapperComponents/OverviewWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as groupActions from '../actions/groupActions';
import * as scoresActions from '../actions/scoresActions';
import * as questionsActions from '../actions/questionsActions';

class gameFinishedPopUp extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      waarschuwing: false,
    };
  }

  render() {
    const {question, actions, group, music} = this.props;

    dismissModal = () => {
      music.buttonClick.play()
      actions.toggleVisibility()
    }

    backToMainMenu = () => {
      music.buttonClick.play()
      NetInfo.isConnected.addEventListener(
        'change',
        handleFirstConnectivityChange
      );

      NetInfo.isConnected.fetch().then(isConnected => {
        if(isConnected){
          this.setState({waarschuwing: false})
          
          //Scores opslaan
          actions.saveScore(group.name, group.coins)

          //Wis groep, en reset vragen
          actions.deleteGroup()
          actions.deleteQuestions()

          //Terug naar home
          Actions.home()
        }
        else{
          this.setState({waarschuwing: true})
        }
      });
    }

    _tochAfsluiten = () => {
      music.buttonClick.play()

      actions.deleteQuestions()
      actions.deleteGroup()
      Actions.home()
    }

    handleFirstConnectivityChange = (isConnected) => {
      console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
      NetInfo.isConnected.removeEventListener(
        'change',
        handleFirstConnectivityChange
      );
    }


    let vraagTitel = require('../images/vraag-popup/banner-vraag.png');
    let locatieAfbeelding = require('../images/vraag-popup/locatie.jpg');
    let schild = require('../images/vraag-popup/schild-vraag.png');
    let opnieuwProberen = require('../images/eind-waarschuwing/probeeropnieuw-button.png');
    let tochAfsluiten = require('../images/eind-waarschuwing/tochafsluiten-button.png');
    let knop = require('../images/einde-popup/button-hoofdmenu.png');
    let coinBag = require('../images/einde-popup/muntenzak.png');


    if(this.state.waarschuwing){
      return(
        <OverviewWrapper image={question != undefined ? question.image : null}>
          <View style={styles.waarschuwingsVraag}>
            <Image 
              source={vraagTitel} 
            >
              <View style={styles.vraagTekst}>
                <Text style={styles.vraagTitel}>Waarschuwing!</Text>
              </View>
            </Image>

            <View style={styles.waarschuwingsVraagBox} > 
              <View style={styles.profileView}>
                <Text style={styles.waarschuwingsTekst}>
                    De tablet heeft op dit moment{'\n'}geen internetverbinding.
                    Als je{'\n'}nu afsluit wordt jullie score niet{'\n'}opgeslagen!
                </Text>
              </View>

              <View style={styles.waarschuwingenGevondenKnop}>
                  <TouchableHighlight underlayColor="transparent" onPress={backToMainMenu}>
                    <Image source={opnieuwProberen}></Image>
                  </TouchableHighlight>

                  <TouchableHighlight underlayColor="transparent" onPress={_tochAfsluiten}>
                    <Image source={tochAfsluiten}></Image>
                  </TouchableHighlight>
              </View>

            </View>

          </View>
        </OverviewWrapper>
      )
    }
    else{
      return (
          <GameFinishedWrapper image={question != undefined ? question.image : null}>
            <View style={styles.vraag}>
              <Image 
                source={vraagTitel} 
              >
                <View style={styles.vraagTekst}>
                  <Text style={styles.vraagTitel}>Goed gedaan!</Text>
                </View>
              </Image>

              <View style={styles.vraagBox} > 
                <View style={styles.profileView}>
                    <Image
                      style={styles.profile}
                      source={{uri: group.image}} />
                  <Text style={styles.groepsNaam}>{group.name}</Text>
                </View>

                <View style={styles.scoreView}>
                  <View>
                    <Text style={styles.totaalScoreTekst}>Totaalscore</Text>
                  </View>

                  <View style={styles.scoreInformatie}>
                    <Image
                      source={coinBag} />
                    <Text style={styles.score}>x {group.coins}</Text>
                  </View>
                </View>

                <View style={styles.gevondenKnop}>
                  <TouchableHighlight underlayColor="transparent" onPress={backToMainMenu}>
                    <Image source={knop}></Image>
                  </TouchableHighlight>
                </View>

              </View>

            </View>
          </GameFinishedWrapper>
      )
    }
  }
}

export default connect(store => ({
    group: store.group,
    question: store.questions.currentQuestion,
    scores: store.scorelist,
    music: store.music,
  }),
  (dispatch) => ({
    actions: bindActionCreators({...groupActions, ...scoresActions, ...questionsActions}, dispatch)
  })
)(gameFinishedPopUp);

const styles = StyleSheet.create({
  profileView:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile:{
    width: 250,
    height: 200,
  },
  vraag: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  waarschuwingsVraag: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 110,
  },
  vraagTekst: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  vraagTitel: {
    flex: 0.90,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Chalkboard',
    fontSize: 40,
  },
  vraagBox: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginTop: -20,
    marginLeft: 2,
    paddingRight: 30,
    paddingLeft: 30,
    width: 530,
    height: 600,
  },
  waarschuwingsVraagBox: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginTop: -20,
    marginLeft: 2,
    paddingRight: 30,
    paddingLeft: 30,
    width: 530,
    height: 350,
  },
  groepsNaam:{
    marginBottom: 5,
    marginTop: 5,
    fontFamily: "Chalkboard",
    fontSize: 35,
    color: 'black',
  },
  waarschuwingsTekst:{
    marginBottom: 5,
    marginTop: 5,
    fontFamily: "Chalkboard",
    fontSize: 24,
    color: 'black',
    lineHeight: 50,
    textAlign: 'center',
  },
  scoreView:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totaalScoreTekst:{
    fontFamily: 'Gerstner BQ_bold',
    fontSize: 18,
    color: 'black',
  },
  scoreInformatie:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  score:{
    marginLeft: 10,
    fontFamily: 'Gerstner BQ',
    fontSize: 18,
    color: 'black',
  },
  gevondenKnop:{
    marginBottom: 10,
    alignItems: 'center',
  },
  waarschuwingenGevondenKnop:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    alignItems: 'center',
  },
});