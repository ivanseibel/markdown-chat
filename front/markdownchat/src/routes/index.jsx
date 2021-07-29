import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from '../ui/pages';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  );
};

export default Routes;
