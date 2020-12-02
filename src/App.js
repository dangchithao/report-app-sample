import React, { Suspense } from 'react';
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom';

import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={LoginPage}/>
            <Route path="/home" component={HomePage}/>
          </Switch>
        </Suspense>
      </HashRouter>
    );
  }
};
