import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import EditDailytotalForm from './EditDailytotalForm.jsx';

export default class Dailytotal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      mode: false,
    };
  }

  toggleeditmode() {
    this.setState({
        mode: true,
      });
  }

  toggleviewmode() {
    this.setState({
        mode: false,
      });
  }

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('dailytotals.setChecked', this.props.dailytotal._id, !this.props.dailytotal.checked);
  }

  deleteThisDailytotal() {
    Meteor.call('dailytotals.remove', this.props.dailytotal._id);
  }

  renderDailytotalMode(props) {

    if (this.state.mode === true) {
      return (
       <li>
        <EditDailytotalForm  dailytotal={props} />
        <center><button className="results btn btn-success"
                onClick={this.toggleviewmode.bind(this)}>
          View Results
        </button></center>
       </li>
     );
    } else {
      return (
        <li className='dailytotalClassName'>
          <div className="toggleView">
            <button className="edit" onClick={this.toggleeditmode.bind(this)}>Edit</button>
            <button className="delete" onClick={this.deleteThisDailytotal.bind(this)}>
              &times;
            </button>

            <input
              type="checkbox"
              readOnly
              checked={this.props.dailytotal.checked}
              onClick={this.toggleChecked.bind(this)}
            />
            { this.props.showPrivateButton ? (
              <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
                { this.props.dailytotal.private ? 'Private' : 'Public' }
              </button>
            ) : ''}

            <span className="text">
              checked by: <strong>{this.props.dailytotal.username}</strong>: Total: ${this.props.dailytotal.total}  -
              Category: {this.props.dailytotal.category} [Due Date: {this.props.dailytotal.date}]
            </span>
          </div>
          <div className="toggleEdit">
          </div>
        </li>
      );
    }
  }

  togglePrivate() {
    Meteor.call('dailytotals.setPrivate', this.props.dailytotal._id, !this.props.dailytotal.private);
  }

  render() {
    return (
      <div>
        {this.renderDailytotalMode(this.props.dailytotal)}
      </div>
    );
  }
}
