import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/Profile/ProfilePage';

export const Routes = () => {
  return(
    <Switch>
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/" component={Landing} />
    </Switch>
  );
};