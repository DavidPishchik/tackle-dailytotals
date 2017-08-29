import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Import API
import { Dailytotals } from '../api/dailytotals';

//Import UI
import Authenticated from './components/Authenticated';
import MainMenu from './components/MainMenu';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Login from './features/user/Login';

//App component - represents the whole app
const App = props => (
  <Router>
    {!props.loading ? <div className="App">
      <div className="container">
      <MainMenu />
        <Switch>
          <Route exact name="index" path="/" component={Index} />
          <Authenticated exact path="/dashboard" component={Dashboard} {...props} />
          <Route exact name="login" path="/login" component={Login}  />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div> : ''}
  </Router>
);

const getUserName = name => ({
  string: name,
  object: `${name.first} ${name.last}`,
}[typeof name]);

export default createContainer(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;

  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    roles: !loading && Roles.getRolesForUser(userId),
  };
}, App);
