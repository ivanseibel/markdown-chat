import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import { RoomContext } from '../context';
import { Home } from '../ui/pages';
import { Room } from '../ui/pages';

const Routes = () => {
  const { isConnected } = useContext(RoomContext);

  const actualComponent = !isConnected
    ? Home
    : Room

  return (
    <Switch>
      <Route path="/" exact component={actualComponent} />
    </Switch>
  );
};

export default Routes;
