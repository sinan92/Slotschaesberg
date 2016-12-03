import React, { Component } from 'react';
import { View, Text, TextInput, Picker, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MenuWrapper from '../components/WrapperComponents/MenuWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as groupActions from '../actions/groupActions';
import * as questionsActions from '../actions/questionsActions';
import Camera from 'react-native-camera';

class StartGame extends Component {
  constructor(props) {
    super(props);
    this.props.actions.fetchQuestions();
    console.log(this.props)

    this.state = {
      name: null,
      grade: null,
      route: null,
      image: null,
      gameStarted: false,
    };
  }

  componentDidMount(){
    const { group, actions } = this.props;
    if(this.props.image){
      this.setState({name: this.props.name, grade: this.props.grade, route: this.props.route, image: this.props.image})
    }

    if(group.name != null){
      this.setState({gameStarted: true})
    }
  }

  render() {
    const { group, actions } = this.props;
    let buttonBeginHetAvontuur = require('../images/speel-het-spel/button-begin-het-avontuur.png');
    let buttonMaakFoto = require('../images/speel-het-spel/button-maak-foto.png');
    let buttonSpeelVerder = require('../images/speel-het-spel/button-speel-verder.png');
    let coinbag = require('../images/speel-het-spel/coinbag.png');
    let lijn = require('../images/speel-het-spel/lijn.png');
    let nieuwSpel = require('../images/speel-het-spel/nieuw-spel.png');
    let placeholderGroepsfoto = require('../images/speel-het-spel/placeholder-groepsfoto.png');
    let verderSpelen = require('../images/speel-het-spel/verder-spelen.png');
    let besteSpelersKnop = require('../images/homescreen/button-beste-spelers.png');
    let verderSpelenContent = null;

    if(this.props.group.name != null){
      verderSpelenContent = (
                <View>
                  <Text style={styles.hoofdTekst}>{group.name}</Text>
                  <Text style={styles.statusTekst}>Route {group.route} - Groep {group.grade}</Text>
                  <View style={styles.muntenZak}>
                    <Image
                      source={coinbag}
                    />
                    <Text style={styles.muntenZakTekst}>x {group.coins}</Text>
                  </View>
                  <TouchableHighlight onPress={Actions.overview} underlayColor="transparent">
                    <Image
                      source={buttonSpeelVerder}
                      />
                  </TouchableHighlight>
                </View>
                  )
    }
    else{
      verderSpelenContent = (
                <View>
                  <Text style={styles.hoofdTekst}></Text>
                  <Text style={[styles.statusTekst, {paddingTop: 40}]}>Er is geen spel opgeslagen.</Text>
                </View>
                )
    }

    toIntroduction = () => {
      actions.deleteQuestions()
      actions.deleteGroup()

      let grade = 1;
      let dealer = Number.parseInt(this.state.grade)
      switch(dealer){
        case 3:
        case 4:
          grade = 1 //Niveau 1
          break
        case 5:
        case 6:
        case 7:
        case 8:
          grade = 2 //Niveau 2
          break
        default:
          grade = 1 //Niveau 1
      }


      actions.setName(this.state.name)
      actions.setGrade(grade)
      actions.setRoute(this.state.route)
      actions.setGroupImage(this.state.image)
      actions.getQuestions()
      Actions.introduction()
    }

    takePicture = () => {
      Actions.camera({name: this.state.name, grade: this.state.grade, route: this.state.route})
    }

    return (
      <MenuWrapper>
          <View style={styles.topView}>
            <View style={styles.verderSpelen}>
              <Image 
                style={styles.verderSpelenTitel} 
                source={verderSpelen} 
                />

              <View style={styles.verderSpelenBox} > 
                {verderSpelenContent}
              </View>

            </View>
            <View>
              <Image 
                source={nieuwSpel} 
                />

              <View style={styles.niewSpelBox} >  
                <TextInput 
                  style={[styles.inputFields, styles.teamNaamInvoer]} 
                  placeholder="Teamnaam" 
                  placeholderTextColor="#717171" 
                  underlineColorAndroid="#e5e5e5" 
                  onChangeText={(text) => this.setState({name: text})}
                  value={this.state.name}
                  />

                <Picker
                  style={[styles.inputFields, styles.pickerBox]}
                  selectedValue={this.state.grade} 
                  onValueChange={this.onValueChange.bind(this, 'grade')}>
                  <Picker.Item label="Kies een groep" value="kies-groep" />
                  <Picker.Item label="Groep 3" value="3" />
                  <Picker.Item label="Groep 4" value="4" />
                  <Picker.Item label="Groep 5" value="5" />
                  <Picker.Item label="Groep 6" value="6" />
                  <Picker.Item label="Groep 7" value="7" />
                  <Picker.Item label="Groep 8" value="8" />
                </Picker>

                <Picker
                  style={[styles.inputFields, styles.pickerBox]}
                  selectedValue={this.state.route}
                  onValueChange={this.onValueChange.bind(this, 'route')}>
                  <Picker.Item label="Kies een route" value="kies-route" />
                  <Picker.Item label="Route 1" value="1" />
                  <Picker.Item label="Route 2" value="2" />
                  <Picker.Item label="Route 3" value="3" />
                </Picker>

                <View style={styles.fotoView} >
                  <Image 
                    style={styles.fotoImage}
                    source={this.state.image != null ? {uri: this.state.image} : placeholderGroepsfoto}
                  />
                  <TouchableHighlight onPress={takePicture}>
                    <Image 
                      style={styles.fotoButton}
                      source={buttonMaakFoto}
                    />
                  </TouchableHighlight>
                </View>

                <TouchableHighlight onPress={toIntroduction} underlayColor="transparent">
                  <Image source={buttonBeginHetAvontuur}
                  />
                </TouchableHighlight>
              </View>

            </View>
          </View>
          <View style={styles.bottomView}>
            <TouchableHighlight onPress={Actions.highscores} underlayColor="transparent">
              <Image 
                source={besteSpelersKnop} 
                />
            </TouchableHighlight>
          </View>
      </MenuWrapper>
    )
  }


  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };
}

export default connect(store => ({
    group: store.group,
    questions: store.questions.questions
  }),
  (dispatch) => ({
    actions: bindActionCreators({...groupActions, ...questionsActions}, dispatch)
  })
)(StartGame);

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 270,
    marginBottom: -300,
    height: 500,

  },
  verderSpelen: {
    marginRight: 50,
  },
  verderSpelenBox: {
    backgroundColor: 'white',
    marginTop: -10,
    marginLeft: 46,
    paddingRight: 20,
    paddingLeft: 20,
    width: 234,
    height: 190,
  },
  hoofdTekst: {
    paddingBottom: 5,
    fontSize: 20,
    fontFamily: 'Gerstner BQ_bold',
    textAlign: 'center',
  },
  statusTekst: {
    paddingTop: 5,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    fontFamily: 'Gerstner BQ_bold',
    fontSize: 12,
    textAlign: 'center',
  },
  muntenZak: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  muntenZakTekst: {
    paddingLeft: 10,
    fontFamily: 'Chalkboard_bold',
    fontSize: 20,
  },
  niewSpelBox: {
    backgroundColor: 'white',
    marginTop: -10,
    marginLeft: 20,
    paddingRight: 20,
    paddingLeft: 20,
    width: 234,
    height: 280,
  },
  inputFields: {
    marginBottom: 10,
    backgroundColor: '#e5e5e5',
    height: 35,
    color: '#717171',
    borderRadius: 10,
  },
  teamNaamInvoer: {
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  pickerBox: {
  },
  fotoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  fotoImage: {
    height: 79,
    width: 79,
  },
  fotoButton: {

  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
  },
});