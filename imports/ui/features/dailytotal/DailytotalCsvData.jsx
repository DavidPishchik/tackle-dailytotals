import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button } from 'react-bootstrap';
import Papa from 'papaparse';
import { Dailytotals } from '../../../api/dailytotals.js';

// App component - represents the whole app
class DailytotalCsvData extends Component {

  handleExportButton() {
    let data = this.props.dailytotals;
    let downloadCSV = function (csv) {
      var blob = new Blob([csv]);
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob, { type: 'text/plain' });
      a.download = 'dailytotals.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    var csv = Papa.unparse(data);
    downloadCSV(csv);
  }

  handleImportSubmit(event) {

    event.preventDefault();

    const file = ReactDOM.findDOMNode(this.refs.fileInput).files[0];

    /*
    Papa.parse(file, {
      header: true,
      step: function (results) {
              console.log('Row:', results.data);
            },

      complete: function (results, file) {
        console.log('Parsing complete:', results, file);
      },
    });
    */
    Papa.parse(file, {

      step: function (row) {
        console.log('Row:', row.data[0]);
        let rowstring = new String(row.data[0]).trim()
        rowarray = rowstring.split(',');



        const newDailytotals = {
          text: rowarray[0],
          dueDate: rowarray[1],
          category: rowarray[2],
        };
        Meteor.call('dailytotals.insert',  newDailytotals);
      },

      complete: function () {
        console.log('All done!');
      },
    });
  }

  render() {
    return (
      <div className="toggleCSV">
        <h3>Import Data</h3>
        <form className="parseUpload"
              onSubmit={this.handleImportSubmit.bind(this)} >
          <div className="row">
            <div className="col-md-11">
             <input
               type="file"
               ref="fileInput"
             />
            </div>
            <div className="col-md-1">
              <button  className="btn btn-success"> + </button>
            </div>
          </div>
         </form>
         <h3>Export Data</h3>

         <button onClick={this.handleExportButton.bind(this)}
           className="btn btn-success"> Export CSV</button>
      </div>
    );
  }
}
export default createContainer(() => {
  Meteor.subscribe('dailytotals');

  return {
    dailytotals: Dailytotals.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, DailytotalCsvData);
