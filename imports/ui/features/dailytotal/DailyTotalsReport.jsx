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
    const databar = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
          label: 'Sales',
          type:'line',
          data: [51, 65, 40, 49, 60, 37, 40],
          fill: false,
          borderColor: '#EC932F',
          backgroundColor: '#EC932F',
          pointBorderColor: '#EC932F',
          pointBackgroundColor: '#EC932F',
          pointHoverBackgroundColor: '#EC932F',
          pointHoverBorderColor: '#EC932F',
          yAxisID: 'y-axis-2'
        },{
          type: 'bar',
          label: 'Visitor',
          data: [200, 185, 590, 621, 250, 400, 95],
          fill: false,
          backgroundColor: '#71B37C',
          borderColor: '#71B37C',
          hoverBackgroundColor: '#71B37C',
          hoverBorderColor: '#71B37C',
          yAxisID: 'y-axis-1'
        }]
    };
    const options = {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ],
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: true
            },
            labels: {
              show: true
            }
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ]
      }
    };
    const plugins = [{
        afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            ctx.fillText("This text drawn by a plugin", 100, 100);
        }
    }];
    return (
      <div className="container">
        <h4> total days opened ({this.props.incompleteCount})</h4>
        <div className="col-md-6">
            <Doughnut ref='chart' data={data} />
        </div>
        <div className="col-md-6">
          <Bar
            data={databar}
            options={options}
            plugins={plugins}
          />
        </div>
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
