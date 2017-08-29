import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Dashboard from './Dashboard';
import Intro from './Intro';
import Footer from '../components/Footer.jsx';

class Index extends Component {

  render() {
    return (
      <div className="container">
         { this.props.currentUser ?
           <Dashboard /> : <Intro />
         }
        <Footer />
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, Index);
