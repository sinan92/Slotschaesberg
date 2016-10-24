import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import OverviewWrapper from '../components/WrapperComponents/OverviewWrapper'

export default class Home extends Component {
  render() {
    let vraag1 = require('../images/overview/cirkel-Vraag1.png');
    let vraag2 = require('../images/overview/cirkel-Vraag2.png');
    let vraag3 = require('../images/overview/cirkel-Vraag3.png');
    let vraag4 = require('../images/overview/cirkel-Vraag4.png');
    let vraag5 = require('../images/overview/cirkel-Vraag5.png');
    let vraag6 = require('../images/overview/cirkel-Vraag6.png');
    let vraag7 = require('../images/overview/cirkel-Vraag7.png');
    let vraag8 = require('../images/overview/cirkel-Vraag8.png');
    let naamBg = require('../images/overview/naam-bg.png');
    let coinBg = require('../images/overview/cointotaal-placeholder.png');
    let profile = require('../images/overview/profile.jpg');
    let munt = require('../images/overview/munt.png');

    return (
      <OverviewWrapper>
          <View style={styles.statusBox}>
            <Image source={profile} style={styles.profile} />
            <Image source={naamBg} style={styles.naamBg}>
              <Text style={styles.profileText}>De Wuppies</Text>
            </Image>
            <Image source={coinBg} style={styles.coinBg}>
              <Image
                style={styles.coinBgImage}
                source={munt} />
              <Text style={styles.coinBgTekst}>
                  x 20
              </Text>
            </Image>
          </View>
          <Image source={vraag1} style={[styles.punt, styles.punt1]} />
          <Image source={vraag2} style={[styles.punt, styles.punt2]} />
          <Image source={vraag3} style={[styles.punt, styles.punt3]} />
          <Image source={vraag4} style={[styles.punt, styles.punt4]} />
          <Image source={vraag5} style={[styles.punt, styles.punt5]} />
          <Image source={vraag6} style={[styles.punt, styles.punt6]} />
          <Image source={vraag7} style={[styles.punt, styles.punt7]} />
          <Image source={vraag8} style={[styles.punt, styles.punt8]} />
      </OverviewWrapper>
    )
  }
}

const styles = StyleSheet.create({
  profile:{
    width: 250,
    height: 200,
  },
  profileText:{
    marginTop: 7,
    color: 'white',
    fontSize: 28,
    fontFamily: 'Gerstner BQ',
    textAlign: 'center',
  },
  statusBox: {
    position: 'absolute',
    right: 0,
    flex: 1,
    flexDirection: 'column',
  },
  naamBg:{
    marginBottom: 20,
  },
  coinBg:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 50,
  },
  coinBgTekst:{
    marginLeft: 5,
    fontSize: 25,
    fontFamily: 'Chalkboard',
    color: 'black',
  },
  punt:{
    position: 'absolute',
  },
  punt1: {
    marginTop: 95,
    marginLeft: 390,
  },
  punt2: {
    marginTop: 80,
    marginLeft: 760,
  },
  punt3: {
    marginTop: 360,
    marginLeft: 105,
  },
  punt4: {
    marginTop: 495,
    marginLeft: 470,
  },
  punt5: {
    marginTop: 220,
    marginLeft: 890,
  },
  punt6: {
    marginTop: 460,
    marginLeft: 840,
  },
  punt7: {
    marginTop: 650,
    marginLeft: 780,
  },
  punt8: {
    marginTop: 290,
    marginLeft: 550,
  },
});