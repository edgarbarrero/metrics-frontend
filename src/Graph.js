import './Graph.css';
import { Bar } from 'react-chartjs-2';
import React from 'react';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      dataset: [],
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
          dataset: Object.values(result)
        });
        console.log(this.labels);
      },
      // Nota: es importante manejar errores aquí y no en
      // un bloque catch() para que no interceptemos errores
      // de errores reales en los componentes.
      (error) => {
        console.log("error reponse");
        console.log(error);
        // this.setState({
        //   isLoaded: true,
        //   error
        // });
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
          <Bar data={this.data()} options={options} />
        </div>
      </div>
    );
  }
}

// const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: 'value',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

const options = {
  indexAxis: 'x',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
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
