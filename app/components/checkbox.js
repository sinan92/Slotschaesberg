import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, TouchableHighlight} from 'react-native';
import * as questionsActions from '../actions/questionsActions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class checkbox extends Component {
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

    const _onPress = () => {
        this.state.checked ? this.setState({checked: false}) : this.setState({checked: true})
        actions.toggleAnswer(id)
    }

    return (
      <TouchableHighlight 
        underlayColor="transparent" 
        style={styles.TouchableHighlight} 
        onPress={_onPress}>

        <View style={styles.wrapper}>
          <Image
            source={this.state.checked ? checked : unchecked}
           />
          <Text ellipsizeMode='head' style={styles.text}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default connect(store => ({
    question: store.questions,
  }),
  (dispatch) => ({
    actions: bindActionCreators({...questionsActions}, dispatch)
  })
)(checkbox);

const styles = StyleSheet.create({
  TouchableHighlight:{
    height: 65,
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