import React, { Component } from 'react';
import DailytotalList from '../features/dailytotal/DailytotalList.jsx';
import DailyTotalsReport from '../features/dailytotal/DailyTotalsReport.jsx';
import Footer from '../components/Footer.jsx';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <h1>Dashboard</h1>
        <div className="container">
          <DailyTotalsReport />
          <DailytotalList />
        </div>
      </div>
    );
  }
}
