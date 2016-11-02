import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';

import * as reducers from '../reducers';
import Routing from './Routing';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer, undefined, autoRehydrate());
persistStore(store, {
	storage: AsyncStorage,
	whitelist: ['group', 'questions'],
	}, () => {
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routing />
      </Provider>
    );
  }
}
