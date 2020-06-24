import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Rooms, Menu } from './components';

const App = () => {

  return (
    <div>
      <Switch>
        <Route path={'/'} component={Menu} />  
        <Route path={'/rooms'} component={Rooms} />
      </Switch>
    </div>
  );
}

export default App;
