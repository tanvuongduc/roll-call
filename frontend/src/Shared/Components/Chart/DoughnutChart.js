import React from "react";
import {
  Chart,
  ArcElement,
  DoughnutController,
  Legend,
  Tooltip
} from 'chart.js';

Chart.register(
  ArcElement,
  DoughnutController,
  Legend,
  Tooltip
);
// Doughnut
class DoughnutChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {

  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'doughnut',
      options: {
        maintainAspectRatio: false
      },
      data: {
        labels: this.props.data.map(d => d.label),
        datasets: [{
          data: this.props.data.map(d => d.value),
          backgroundColor: this.props.colors,
        }]
      }
    });

  }


  render() {
    return <canvas ref={this.canvasRef} />;
  }
}
export default DoughnutChart