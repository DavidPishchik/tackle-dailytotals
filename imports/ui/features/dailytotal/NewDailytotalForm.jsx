import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button } from 'react-bootstrap';

export default class NewDailytotalForm extends Component {

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const dailytotal = {
      text: this.text.value.trim(),
      dueDate: this.dueDate.value.trim(),
      category: this.category.value.trim(),
    };

    Meteor.call('dailytotals.insert', dailytotal);

    this.text.value = '';
    this.category.value = '';
    this.dueDate.value = '';

  }

  render() {
    return (
      <form className="new-dailytotal" onSubmit={this.handleSubmit.bind(this)} >
        <div className="row">
          <div className="col-md-5">
           <input
             type="text"
             ref={text => (this.text = text)}
             placeholder="Type to add new dailytotal"
           />
          </div>
          <div className="col-md-3">
           <input
             type="text"
             ref={dueDate => (this.dueDate = dueDate)}
             placeholder="Type to add due date for dailytotal"
           />
          </div>
          <div className="col-md-3">
            <select  name="categories" type="text"
                    ref={category => (this.category = category)}>
              <option default hidden>Choose a Category</option>
              <option value="Critical">Critical</option>
              <option value="Opportunity">Opportunity</option>
              <option value="Horizon">Horizon</option>
            </select>
          </div>
          <div className="col-md-1">
           <button className="btn btn-success"> + </button>
          </div>
        </div>
      </form>
    );
  }
}
