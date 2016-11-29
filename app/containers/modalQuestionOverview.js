import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import LocatieWrapper from '../components/WrapperComponents/LocatieWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as groupActions from '../actions/groupActions';
import * as modalActions from '../actions/modalActions';
import * as questionsActions from '../actions/questionsActions';
import Video from 'react-native-video';

class modalQuestionOverview extends Component {
  render() {
    const {question, modal, actions} = this.props;

    dismissModal = () => {
      actions.toggleVisibility()
    }

    goToCamera = () => {
      actions.disableVisibility()
      Actions.qrcodescanner()
    }


    let vraagTitel = require('../images/vraag-popup/banner-vraag.png');
    let locatieAfbeelding = require('../images/vraag-popup/locatie.jpg');
    let schild = require('../images/vraag-popup/schild-vraag.png');
    let knop = require('../images/vraag-popup/knop-we-hebben-hem-gevonden.png');
    let munt = require('../images/overview/munt.png');
    let video = require('../videos/HISTORISCHETUIN.mp4');


    if(!modal.visibility){
      return (
          <View></View>
        )
    }
    else{
      return (
          <LocatieWrapper image={question.image}>
            <View style={styles.vraag}>
              <Image 
                source={vraagTitel} 
              >
                <View style={styles.vraagTekst}>
                  <Text style={styles.vraagTitel}>Vraag {question.vraag_nr}</Text>
                  <TouchableHighlight underlayColor="transparent" onPress={dismissModal}>
                    <Text style={styles.vraagKruis}>X</Text>
                  </TouchableHighlight>
                </View>
              </Image>

              <View style={styles.vraagBox} > 
                <View style={styles.locatie}>
                  <View style={styles.locatieAfbeeldingView}>
                      <Video source={video}   // Can be a URL or a local file.
                         ref={(ref) => {
                           this.player = ref
                         }}                             // Store reference
                         rate={1.0}                     // 0 is paused, 1 is normal.
                         volume={1.0}                   // 0 is muted, 1 is normal.
                         muted={false}                  // Mutes the audio entirely.
                         paused={true}                 // Pauses playback entirely.
                         resizeMode="cover"             // Fill the whole screen at aspect ratio.
                         repeat={true}                  // Repeat forever.
                         playInBackground={false}       // Audio continues to play when app entering background.
                         playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown.
                         progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
                         onLoadStart={this.loadStart}   // Callback when video starts to load
                         onLoad={this.setDuration}      // Callback when video loads
                         onProgress={this.setTime}      // Callback every ~250ms with currentTime
                         onEnd={this.onEnd}             // Callback when playback finishes
                         onError={this.videoError}      // Callback when video cannot be loaded
                         style={styles.locatieAfbeelding} />
                  </View>
                  <View style={styles.locatieTeksten}>
                      <Text style={styles.locatieTekstenLocatieLabel}>Locatie</Text>
                      <Text style={styles.locatieTekstenLocatieNaam}>{question.locatie_naam}</Text>
                      <Text style={styles.locatieTekstenBeloningLabel}>Beloning</Text>

                      <View style={styles.beloning}>
                        <Image
                          source={munt} />

                        <Text style={styles.beloningTekst}>x {question.beloning}</Text>
                      </View>
                  </View>
                </View>

                <View style={styles.zoekDeSchaesPlaat}>
                  <Text style={styles.zoekDeSchaesPlaatTekst}>Zoek het schild:</Text>
                  <Image
                    source={schild} />
                </View>

                <View style={styles.gevondenKnop}>
                  <TouchableHighlight underlayColor="transparent" onPress={goToCamera}>
                    <Image source={knop}></Image>
                  </TouchableHighlight>
                </View>

              </View>

            </View>
          </LocatieWrapper>
      )
    }
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
)(modalQuestionOverview);

const styles = StyleSheet.create({
  vraag: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  vraagTekst: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  vraagTitel: {
    flex: 0.90,
    marginLeft: 100,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Chalkboard',
    fontSize: 40,
  },
  vraagKruis: {
    flex: 0.10,
    marginRight: 100,
    textAlign: 'left',
    color: 'white',
    fontFamily: 'Chalkboard_bold',
    fontSize: 40,
  },
  vraagBox: {
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: -20,
    marginLeft: 2,
    paddingRight: 30,
    paddingLeft: 30,
    width: 530,
    height: 600,
  },
  locatie:{
    flexDirection: 'row',
  },
  locatieAfbeeldingView:{
    flex: 0.5,
  },
  locatieTeksten:{
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locatieTekstenLocatieLabel:{
    marginBottom: -10,
    fontFamily: "Chalkboard",
    fontSize: 24,
    color: 'black',
  },
  locatieTekstenLocatieNaam:{
    fontFamily: "Chalkboard",
    fontSize: 18,
    color: 'black',
  },
  locatieTekstenBeloningLabel:{
    fontFamily: "Chalkboard",
    fontSize: 24,
    color: 'black',
  },
  beloning:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  beloningTekst:{
    marginLeft: 5,
    fontFamily: "Chalkboard",
    fontSize: 24,
    color: 'black',
  },
  zoekDeSchaesPlaat:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoekDeSchaesPlaatTekst:{
    marginBottom: 5,
    marginTop: 5,
    fontFamily: "Chalkboard",
    fontSize: 35,
    color: 'black',
  },
  gevondenKnop:{
    marginTop: 20,
    alignItems: 'center',
  },
});