import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './components/Landing';

export const Routes = () => {
  return(
    <Switch>
      <Route path="/" component={Landing} />
    </Switch>
  );
};