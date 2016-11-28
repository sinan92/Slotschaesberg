import React, { Component } from 'react';
import { View, ListView, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import MenuWrapper from '../components/WrapperComponents/MenuWrapper'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as scoresActions from '../actions/scoresActions';

class Highscores extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let highScoresData = [{empty: true}]
    if(this.props.scores != null){
      highScoresData = this.props.scores
    }
    this.state = {
      dataSource: ds.cloneWithRows(highScoresData),
    };
    console.log(this.props.scores)
  }

  render() {
    let terug = require('../images/highscores/terug-knop.png');
    let besteSpelersTitel = require('../images/highscores/banner-beste-spelers.png');
    return (
      <MenuWrapper>
          <View style={styles.topView}>
            <View style={styles.besteSpelers}>
              <Image 
                style={styles.besteSpelersTitel} 
                source={besteSpelersTitel} 
                />

              <ListView
                style={styles.besteSpelersBox}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
              />
            </View>
          </View>
          <View style={styles.bottomView}>
            <TouchableHighlight onPress={Actions.home} underlayColor="transparent">
              <Image 
                source={terug} 
                />
            </TouchableHighlight>
          </View>
      </MenuWrapper>
    )
  }

  _renderRow(rowData, sectionID, rowID){
    let eerstePlaats = require('../images/highscores/cup-1e-plaats.png');
    let tweedePlaats = require('../images/highscores/cup-2e-plaats.png');
    let derdePlaats = require('../images/highscores/cup-3e-plaats.png');
    let vierdePlaats = require('../images/highscores/4e-plaats.jpg');
    let puntenZak = require('../images/highscores/coinbag.png');
    console.log(rowData)

    let ranks = [eerstePlaats, tweedePlaats, derdePlaats, vierdePlaats];
    let colors = ['#efefef', '#ffffff'];
    let style = [
         styles.besteSpelersItem, 
         {'backgroundColor': colors[rowID % colors.length]}
       ];
    if(rowData.empty){
      return (
          <View style={style}>
            <View style={styles.rank}>
              <Text style={styles.groepsNaam}>Er zijn nog geen scores.</Text>
            </View>
          </View>
        )
    }
    else{
      return(
          <View style={style}>
            <View style={styles.rank}>
              <Image
                source={ranks[rowID]}
              />
              <Text style={styles.groepsNaam}>{rowData.naam}</Text>
            </View>
            <View style={styles.punten}>
              <Image
                source={puntenZak}
              />
              <Text style={styles.puntenTekst} >x{rowData.score}</Text>
            </View>
          </View>
        )
    }
  }

}

export default connect(store => ({
    scores: store.scorelist.scores
  }),
  (dispatch) => ({
    actions: bindActionCreators({...scoresActions}, dispatch)
  })
)(Highscores);

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 270,
    marginBottom: -300,
    height: 500,

  },
  besteSpelers: {
    marginLeft: 0,
  },
  besteSpelersBox: {
    marginTop: -10,
    marginLeft: 68,
  },
  besteSpelersItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 30,
    paddingLeft: 30,
    width: 407,
    height: 60,
  },
  rank: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groepsNaam: {
    marginLeft: 20,
    fontSize: 19,
    fontFamily: 'Gerstner BQ_bold',
  },
  punten: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  puntenTekst: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Chalkboard_bold',
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
  },
});