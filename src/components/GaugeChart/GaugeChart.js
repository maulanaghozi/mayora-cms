import React from "react";
import GaugeChart from "react-gauge-chart";
import Styles from "./GaugeChart.module.scss";

export default function GaugeChartOEE(props) {
  const { title, target, value } = props;
  return (
    <div>
      <GaugeChart
        id="gauge-chart5"
        nrOfLevels={420}
        arcsLength={[0.3, 0.5, 0.2]}
        colors={["#5BE12C", "#F5CD19", "#EA4228"]}
        percent={0.37}
        arcPadding={0.02}
      />
      <div>
        <span>{title}</span>
        <span>{`${value}%`}</span>
      </div>
    </div>
  );
}
