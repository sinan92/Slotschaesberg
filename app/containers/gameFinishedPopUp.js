import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import GameFinishedWrapper from '../components/WrapperComponents/GameFinishedWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as groupActions from '../actions/groupActions';
import * as modalActions from '../actions/modalActions';
import * as questionsActions from '../actions/questionsActions';

class gameFinishedPopUp extends Component {
  render() {
    const {question, modal, actions, group} = this.props;

    dismissModal = () => {
      actions.toggleVisibility()
    }

    backToMainMenu = () => {
      Actions.home()
    }


    let vraagTitel = require('../images/vraag-popup/banner-vraag.png');
    let locatieAfbeelding = require('../images/vraag-popup/locatie.jpg');
    let schild = require('../images/vraag-popup/schild-vraag.png');
    let knop = require('../images/einde-popup/button-hoofdmenu.png');
    let coinBag = require('../images/einde-popup/muntenzak.png');


    return (
        <GameFinishedWrapper image={question.image}>
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

export default connect(store => ({
    group: store.group,
    modal: store.modal,
    question: store.questions.currentQuestion,
  }),
  (dispatch) => ({
    actions: bindActionCreators({...groupActions, ...modalActions, ...questionsActions}, dispatch)
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
  groepsNaam:{
    marginBottom: 5,
    marginTop: 5,
    fontFamily: "Chalkboard",
    fontSize: 35,
    color: 'black',
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
});