import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

export const Routes = () => {
  return(
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/" component={Landing} />
    </Switch>
  );
};