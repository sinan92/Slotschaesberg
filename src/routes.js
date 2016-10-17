import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';
import Home from './components/Home'
import Login from './components/Login'

const routes = Actions.create(
  <Scene key="root">
    <Scene key="home" component={Home} title="Home" />
    <Scene key="login" component={Login} title="Login" />
  </Scene>
);

export default routes;