import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import routes from './routes'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
const RouterWithRedux = connect()(Router);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux scenes={routes} />
      </Provider>
    );
  }
}
