import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as questionsActions from '../actions/questionsActions';
import BarcodeScanner from 'react-native-barcodescanner';


class QRCodeScanner extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      torchMode: 'off',
      cameraType: 'back',
    };

    this.barcodeReceived = this.barcodeReceived.bind(this);
  }

  barcodeReceived(e) {
    const {question} = this.props
    var QRCode = e.data;
    var QRCode = QRCode.substr(QRCode.length-8)

    if(QRCode == question.qr_code){
      console.log("Klopt")
    }
    else{
      console.log("Fout")
    }
  }

  render() {
    return (
      <BarcodeScanner
        onBarCodeRead={this.barcodeReceived}
        style={{ flex: 1 }}
        torchMode={this.state.torchMode}
        cameraType={this.state.cameraType}
      />
    );
  }
}



export default connect(store => ({
    question: store.questions.currentQuestion
  }),
  (dispatch) => ({
    actions: bindActionCreators(questionsActions, dispatch)
  })
)(QRCodeScanner);