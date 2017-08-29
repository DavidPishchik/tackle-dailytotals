import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Dailytotals } from '../../../api/dailytotals.js';
import { Meteor } from 'meteor/meteor';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

export default class EditDailytotalForm extends Component {
  handleImportButton() {
    $('.editform').hide();
    $('.results').show();
  }

  handleUpdate(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const dailytotal = {
      _id: this.props.dailytotal._id,
      total: this.total.value.trim(),
      date: this.date.value.trim(),
      category: this.category.value.trim(),
    };

    Meteor.call('dailytotals.update', dailytotal, (error, dailytotalId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Dailytotal updated!', 'success');
      }
    });
    this.handleImportButton(this);
    this.total.value = '';
    this.category.value = '';
    this.date.value =  '';

  }

  render() {
    let dailytotal = this.props.dailytotal;

    return (

      <form className="editform"  onSubmit={this.handleUpdate.bind(this)}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
                <input
                  type="text"
                  name="text"
                  ref={total => (this.total = total)}
                  defaultValue={dailytotal && this.props.dailytotal.total}
                  placeholder="text"
                />
            </div>
            <div className="col-md-3">
                <input
                  type="text"
                  name="date"
                  ref={date => (this.date = date)}
                  defaultValue={dailytotal && this.props.dailytotal.date}
                  placeholder="date"
                />
            </div>
            <div className="col-md-3">
                <select
                  type="text"
                  name="categories"
                  ref={category => (this.category = category)}
                  defaultValue={dailytotal && this.props.dailytotal.category}>
                   <option default hidden>Choose a Category</option>
                   <option value="Critical">Critical</option>
                   <option value="Opportunity">Opportunity</option>
                   <option value="Horizon">Horizon</option>
               </select>

            </div>
            <div className="col-md-1">
              <button className="btn btn-success">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
