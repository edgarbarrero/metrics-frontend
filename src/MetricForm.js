import './MetricForm.css';
import React from 'react';
import $ from 'jquery';

class MetricForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var hash = {};
    hash[`${event.target.name}`] = event.target.value;
    this.setState(hash);
  }

  handleSubmit(event) {
    event.preventDefault();
    var request_data = this.props.requestData

    $.ajax({
      url: "http://localhost:3000/api/v1/metrics",
      type: 'POST',
      data: {
        'name': this.state.name,
        'value': this.state.value,
        'timestamp': this.state.timestamp,
      },
      cache: false,
      success: function(data) {
        request_data()
      },
      error: function(xhr, status, err) {
        console.log(xhr, status);
        console.log(err);
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="mertic-form">
        <label>
          Name:
          <input className="mertic-form-input" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Value:
          <input className="mertic-form-input" type="text" name="value" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Timestamp:
          <input  className="mertic-form-input"type="datetime-local" name="timestamp" value={this.state.timestamp} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default MetricForm;
