import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import OverviewWrapper from '../components/WrapperComponents/OverviewWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as groupActions from '../actions/groupActions';

class modalQuestionOverview extends Component {
  render() {
    let vraagTitel = require('../images/vraag-popup/banner-vraag.png');
    return (
          <View style={styles.vraag}>
            <Image 
              source={vraagTitel} 
            >
            <View style={styles.vraagTekst}>
              <Text style={styles.vraagTitel}>Vraag 1</Text>
              <Text style={styles.vraagKruis}>X</Text>
            </View>
            </Image>

            <View style={styles.vraagBox} > 
            </View>

          </View>
    )
  }
}

export default connect(store => ({
    group: store.group
  }),
  (dispatch) => ({
    actions: bindActionCreators(groupActions, dispatch)
  })
)(modalQuestionOverview);

const styles = StyleSheet.create({
  vraag: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  vraagTekst: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  vraagTitel: {
    marginTop: 5,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Chalkboard',
    fontSize: 40,
  },
  vraagKruis: {
    marginTop: 5,
    textAlign: 'right',
    color: 'white',
    fontFamily: 'Chalkboard',
    fontSize: 40,
  },
  vraagBox: {
    backgroundColor: 'white',
    marginTop: -10,
    marginLeft: 2,
    paddingRight: 20,
    paddingLeft: 20,
    width: 530,
    height: 550,
  },
});