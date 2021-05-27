import React from "react";
import GaugeChart from "react-gauge-chart";
import classNames from "classnames";
import Styles from "./GaugeChart.module.scss";

export default function GaugeChartOEE(props) {
  const { title, target, value, classContainer } = props;
  return (
    <div className={classNames(Styles.container, classContainer)}>
      <GaugeChart
        id="gauge-chart5"
        nrOfLevels={420}
        arcsLength={[target, 1 - target]}
        colors={["#E92548", "#0AC46B"]}
        percent={value}
        arcPadding={0.0}
        style={{ width: "100%" }}
      />
      <div className={Styles.titleContainer}>
        <span className={Styles.title}>{title}</span>
        <span
          className={classNames(Styles.value, { [Styles.red]: value < target })}
        >{`${value * 100}%`}</span>
      </div>
    </div>
  );
}
