import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class MainMenu extends Component {

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          { this.props.currentUser ?
            <a className="navbar-brand" href="/dashboard">Tackle - Daily Totals - Admin</a> :
            <a className="navbar-brand" href="/">Tackle-dailytotals</a>
          }
          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav pull-right mr-auto">
              <li>
                <AccountsUIWrapper />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, MainMenu);
