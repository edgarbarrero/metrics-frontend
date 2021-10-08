import './Graph.css';
import { Bar } from 'react-chartjs-2';
import React from 'react';
import MetricForm from './MetricForm';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      dataset: [],
      group_by: ''
    };
  }

  data() {
    return (
      {
        labels: this.state.labels,
        datasets: [
          {
            label: 'value',
            data: this.state.dataset,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
    );
  }

  requestData(group_by) {
    fetch(`http://localhost:3000/api/v1/metrics?group_by=${group_by}`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          labels: Object.keys(result),
          dataset: Object.values(result),
          group_by: group_by,
        });
      },
      (error) => {
        console.log("error reponse");
        console.log(error);
      }
    )
  }

  render() {
    return (
      <div className="Graph">
        <button className="aggregate-button" onClick={() => this.requestData("day")}>
          Per day
        </button>
        <button className="aggregate-button" onClick={() => this.requestData("hour")}>
          Per hour
        </button>
        <button className="aggregate-button" onClick={() => this.requestData("minute")}>
          Per minute
        </button>
        <div className='bar-graph'>
          <Bar data={this.data()} options={options}/>
        </div>
        <MetricForm requestData={() => this.requestData(this.state.group_by)}/>
      </div>
    );
  }
}


const options = {
  indexAxis: 'x',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: false,
    },
  },
};


export default Graph;
