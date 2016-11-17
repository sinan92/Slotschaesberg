import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, TouchableHighlight} from 'react-native';
import * as questionsActions from '../actions/questionsActions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class fruitGroenten extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      checked: this.props.checked,
    };

  }

  render() {
    const { actions, question, id } = this.props;
    let checked = require('../images/Meerkeuze/checked.png');
    let unchecked = require('../images/Meerkeuze/unchecked.png');

    //Fruit en Groenten
    let appel = require('../images/sleep-vraag-fruit/BUTTON-appel.png');
    let bessen = require('../images/sleep-vraag-fruit/BUTTON-bessen.png');
    let bloemkool = require('../images/sleep-vraag-fruit/BUTTON-bloemkool.png');
    let kiwi = require('../images/sleep-vraag-fruit/BUTTON-kiwi.png');
    let komkommer = require('../images/sleep-vraag-fruit/BUTTON-komkommer.png');
    let paprika = require('../images/sleep-vraag-fruit/BUTTON-paprika.png');
    let sla = require('../images/sleep-vraag-fruit/BUTTON-sla.png');
    let wortel = require('../images/sleep-vraag-fruit/BUTTON-wortel.png');

    let image = null
    switch(this.props.text){
      case "Appel":
        image = appel
        break
      case "Bessen":
        image = bessen
        break
      case "Bloemkool":
        image = bloemkool
        break
      case "Kiwi":
        image = kiwi
        break
      case "Komkommer":
        image = komkommer
        break
      case "Paprika":
        image = paprika
        break
      case "Sla":
        image = sla
        break
      case "Wortel":
        image = wortel
        break
      default:
        image = appel
    }

    const _onPress = () => {
        this.state.checked ? this.setState({checked: false}) : this.setState({checked: true})
        actions.toggleAnswer(id)
    }

    return (

        <View style={styles.wrapper}>
          <Image
            source={image}
           />
        </View>
    );
  }
}

export default connect(store => ({
    question: store.questions,
  }),
  (dispatch) => ({
    actions: bindActionCreators({...questionsActions}, dispatch)
  })
)(fruitGroenten);

const styles = StyleSheet.create({
  TouchableHighlight:{
    height: 90,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 0,
  },
  text:{
    flexWrap: 'wrap',
    marginLeft: 10,
    fontFamily: 'Chalkboard',
    fontSize: 18,
    color: 'black',
    width: 400,
  }
})