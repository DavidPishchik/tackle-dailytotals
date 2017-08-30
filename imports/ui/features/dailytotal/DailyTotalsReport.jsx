import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button } from 'react-bootstrap';

import { Dailytotals } from '../../../api/dailytotals.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

class DailyTotalsReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ref: 'chart',
      type: 'bar',
      data: {
        labels: ['bos', 'wor', 'sprin'],
        datasets: [{
          label: 'Population',
          data: [1212, 232323, 42424],
        },
      ],
      },
      options: {},
    };
  }

  render() {
    let criticaldailytotals = this.props.criticalCount;
    let opportunitydailytotals = this.props.opportunityCount;
    let overthehorizondailytotals = this.props.horizonCount;

    const data = {
      labels: [
        'Critical',
        'Opportunity',
        'Horizon',
      ],
      datasets: [
        {
          data: [criticaldailytotals, opportunitydailytotals, overthehorizondailytotals],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
        },
        ],
    };

    return (
      <div className="container">
        <h4> total days opened ({this.props.incompleteCount})</h4>
        <div className="col-md-6">
            <Doughnut ref='chart' data={data} />
        </div>
        <div className="col-md-6">
          <Bar data={data} width={100} height={50}
               options={{	maintainAspectRatio: false }}/>
        </div>

        <Line data={data} />
      </div>
    );
  }
}

DailyTotalsReport.defaultProps = {
  dailytotal: { text: '' },
};

export default createContainer(() => {
  Meteor.subscribe('dailytotals');

  return {
    dailytotals: Dailytotals.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Dailytotals.find({ checked: { $ne: true } }).count(),
    criticalCount: Dailytotals.find({ category: 'Critical' }).count(),
    opportunityCount: Dailytotals.find({ category: 'Opportunity' }).count(),
    horizonCount: Dailytotals.find({ category: 'Horizon' }).count(),
    currentUser: Meteor.user(),
  };
}, DailyTotalsReport);
