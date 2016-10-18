import React, { Component, PropTypes } from 'react'
import ReactNative from 'react-native'

import { Router, Scene } from 'react-native-redux-router';

import Home from './Home';
import Highscores from './Highscores';

const {
	Animated,
	StyleSheet,
	View,
	Text,
	TouchableHighlight,
} = ReactNative

class AppContainer extends Component {
  render() {
    const { dummy, dummyActions } = this.props;
    return (
      <Router>
        <Scene key="root">
          <Scene key="home" component={Home} title="Home" initial={true} />
          <Scene key="highscores" component={Highscores} title="Highscores" />
        </Scene>
      </Router>
    )
  }
}



function mapState(state) {
  return {
    dummy: state.dummy.toJS(),
  };
}

function mapDispatch(dispatch) {
  return {
    dummyActions: bindActionCreators(DummyActions, dispatch),
  };
}

AppContainer.propTypes = {
  dummyActions: PropTypes.object,
  dummy: PropTypes.object,
};

export default connect(mapState, mapDispatch)(AppContainer);
