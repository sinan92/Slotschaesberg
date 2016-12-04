import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class videoPlayer extends Component {
  constructor(props) {
    super(props)
    this.backToQuestion = this.backToQuestion.bind(this)
    this.restartVideo = this.restartVideo.bind(this)
    this.props.music.backgroundMusic.pause()
  
    this.state = {
      paused: false,
      restart: false,
    };
  }

  backToQuestion(){
    this.props.music.backgroundMusic.play()
    Actions.pop({type:'refresh'})
    this.setState({paused: true, restart: false})
  }

  restartVideo(){
    this.player.seek(0)
    this.setState({restart: false})
  }

  componentWillReceiveProps(nextProps){
    this.setState({paused: nextProps.paused, restart: nextProps.restart})
  }

  render() {
    let video = this.props.video;

    return (
        <TouchableHighlight onPress={this.backToQuestion}>
          <View>
            <Video source={video}   // Can be a URL or a local file.
                   ref={ref => this.player = ref} // Store reference
                   rate={1.0}                     // 0 is paused, 1 is normal.
                   volume={1.0}                   // 0 is muted, 1 is normal.
                   muted={false}                  // Mutes the audio entirely.
                   paused={this.state.paused}                 // Pauses playback entirely.
                   resizeMode="stretch"             // Fill the whole screen at aspect ratio.
                   repeat={false}                  // Repeat forever.
                   playInBackground={false}       // Audio continues to play when app entering background.
                   playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown.
                   progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
                   onLoadStart={this.loadStart}   // Callback when video starts to load
                   onProgress={() => {this.state.restart ? this.restartVideo() : null}}      // Callback every ~250ms with currentTime
                   onEnd={this.backToQuestion}             // Callback when playback finishes
                   onError={this.videoError}      // Callback when video cannot be loaded
                   style={styles.video} />
          </View>
        </TouchableHighlight>
    )
  }
}

export default connect(store => ({
    music: store.music,
  })
)(videoPlayer);

const styles = StyleSheet.create({
  video:{
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-24,
  },
});