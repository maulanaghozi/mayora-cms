import React, { Component } from "react";
import Chart from "react-apexcharts";

class BarChart extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.updateCharts = this.updateCharts.bind(this);

    this.state = {
      optionsMixedChart: {
        colors: ["#E92548", "#0861CB"],
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
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
          categories: data.categories,
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
        yaxis: [
          {
            tickAmount: 5,
            min: 0,
            max: Number(props.target),
          },
        ],
      },
      seriesMixedChart: [
        {
          name: "Target",
          type: "line",
          data: props.dataTarget,
        },
        {
          name: "Actual",
          type: "column",
          data: props.dataRelease,
        },
      ],
    };
  }

  updateCharts() {
    const max = 90;
    const min = 30;
    const newMixedSeries = [];
    const newBarSeries = [];

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
      <div style={{ width: "100%", height: "80%" }}>
        <div className="row" style={{ width: "100%", height: "100%" }}>
          <div className="col mixed-chart" style={{ height: "100%" }}>
            <Chart
              options={this.state.optionsMixedChart}
              series={this.state.seriesMixedChart}
              type="line"
              width="100%"
              height="442"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BarChart;

const data = {
  target: [
    125, 250, 375, 500, 625, 750, 875, 1000, 1125, 1250, 1375, 1500, 1625, 1750,
    1875, 2000, 2125, 2250, 2375, 2500, 2625, 2750, 2875, 3000,
  ],
  actual: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  categories: [
    "07",
    "08",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
  ],
};
