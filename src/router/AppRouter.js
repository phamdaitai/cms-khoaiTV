import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import App from '../App';
import Login from '../components/Login/index';

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login/' component={Login} />
        <Route path='/' component={App} />
      </Switch>
    );
  }
}

export default AppRouter;