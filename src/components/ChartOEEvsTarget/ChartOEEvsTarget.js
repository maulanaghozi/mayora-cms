import React, { Component } from "react";
import Chart from "react-apexcharts";

class ChartOEEvsTarget extends Component {
  constructor(props) {
    super(props);

    // this.updateCharts = this.updateCharts.bind(this);

    this.state = {
      optionsMixedChart: {
        colors: ["#E92548", "#0861CB"],
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
        stroke: {
          width: [4, 0, 0],
        },
        xaxis: {
          categories: props.dates,
        },
        markers: {
          size: 6,
          strokeWidth: 3,
          fillOpacity: 0,
          strokeOpacity: 0,
          hover: {
            size: 8,
          },
        },
        yaxis: {
          tickAmount: 5,
          min: 0,
          max: props.maxValue || 100,
        },
      },
      seriesMixedChart: [
        {
          name: "Target",
          type: "line",
          data: props.targets,
        },
        {
          name: "OEE",
          type: "column",
          data: props.DataOEE,
        },
      ],
    };
  }

  updateCharts() {
    const max = 90;
    const min = 30;
    const newMixedSeries = [];
    const newBarSeries = [];
    const {} = this.state;

    this.state.seriesMixedChart.forEach(s => {
      const data = s.data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      });
      newMixedSeries.push({ data: data, type: s.type });
    });

    this.state.seriesBar.forEach(s => {
      const data = s.data.map(() => {
        return Math.floor(Math.random() * (180 - min + 1)) + min;
      });
      newBarSeries.push({ data, name: s.name });
    });

    this.setState({
      seriesMixedChart: newMixedSeries,
      seriesBar: newBarSeries,
      seriesRadial: [Math.floor(Math.random() * (90 - 50 + 1)) + 50],
    });
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <div className="row" style={{ width: "100%" }}>
          <div className="col mixed-chart">
            <Chart
              options={this.state.optionsMixedChart}
              series={this.state.seriesMixedChart}
              type="line"
              width="100%"
              height="320"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChartOEEvsTarget;

const data = {
  target: [],
  oee: [],
  dates: [],
};
