
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button } from 'react-bootstrap';
import NewDailytotalForm from './NewDailytotalForm.jsx';
import DailytotalCsvData from './DailytotalCsvData.jsx';
import { Dailytotals } from '../../../api/dailytotals.js';
import Dailytotal from './Dailytotal.jsx';

class DailytotalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
      search: '',
    };
  }



  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  toggleHideCompleted() {
    this.setState({
        hideCompleted: !this.state.hideCompleted,
      });
  }

  handleImportButton() {
    {$('.toggleCSV').toggle();}
  }

  handleDailytotalButton() {
    {$('.new-dailytotal').toggle();}
  }

  handleSearchButton() {
    {$('.toggleSearch').toggle();}
  }

  renderDailytotals() {
    let filteredDailytotals = this.props.dailytotals.filter(
      (dailytotal) => {
        return dailytotal.date.indexOf(this.state.search) !== -1;
      }
    );

    if (this.state.hideCompleted) {
      filteredDailytotals = filteredDailytotals.filter(dailytotal => !dailytotal.checked);
    }

    return filteredDailytotals.map((dailytotal) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = dailytotal.owner === currentUserId;

      return (
      <Dailytotal
        key={dailytotal._id}
        dailytotal={dailytotal}
        showPrivateButton={showPrivateButton}
      />
    );
    });
  }

  render() {
      {console.log(this.state.search)}
        {console.log(this.props.fromdate)}



    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <label className="hide-completed">
             <input
               type="checkbox"
               readOnly
               checked={this.state.hideCompleted}
               onClick={this.toggleHideCompleted.bind(this)}
             />
             Hide Completed Dailytotals
            </label>
          </div>
          <div className="col-md-2">
            <Button type="button" onClick={this.handleDailytotalButton.bind(this)}
              className="btn btn-success"> New Dailytotal </Button>
          </div>
          <div className="col-md-2">
            <button onClick={this.handleImportButton.bind(this)}
              className="btn btn-success">CSV</button>
          </div>
          <div className="col-md-2">
            <button onClick={this.handleSearchButton.bind(this)}
              className="btn btn-success">Search</button>
          </div>
        </div>

        <DailytotalCsvData />
        <NewDailytotalForm />
        <div className="toggleSearch">
          <div className="row">
            <div className="col-md-12">
              <form>

                From:<input
                  type="date"
                  onChange={this.updateSearch.bind(this)}
                  ref={date => (this.date = date)}
                  value={this.state.search}
                  placeholder="Type to add due date for dailytotal"
                />
                Untill:<input
                  type="date"
                  ref={date => (this.date = date)}
                  value={this.state.search}
                  placeholder="Type to add due date for dailytotal"
                />
              </form>
            </div>
          </div>
        </div>
        {this.props.fromdate}
        <div className="container">
          <ul className="dailytotalslist">{this.renderDailytotals()}</ul>
        </div>
      </div>
  );
  }
}

DailytotalList.defaultProps = {
  dailytotal: { text: '' },
};

export default createContainer(() => {
  Meteor.subscribe('dailytotals');

  return {
    fromdate: Dailytotals.find({date: {$lt: '2017-10-12'}}).count(),
    dailytotals: Dailytotals.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Dailytotals.find({ checked: { $ne: true } }).count(),
    criticalCount: Dailytotals.find({ category: 'Critical' }).count(),
    opportunityCount: Dailytotals.find({ category: 'Opportunity' }).count(),
    horizonCount: Dailytotals.find({ category: 'Horizon' }).count(),
    currentUser: Meteor.user(),
  };
}, DailytotalList);
