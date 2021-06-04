import React from "react";
import GaugeChart from "react-gauge-chart";
import ReactSpeedometer from "react-d3-speedometer";
import classNames from "classnames";
import Styles from "./GaugeChart.module.scss";

export default function GaugeChartOEE(props) {
  const { title, target, value, classContainer } = props;

  const renderGaugeChart = () => {
    return (
      <GaugeChart
        id="gauge-chart5"
        nrOfLevels={100}
        arcsLength={[target, 1 - target]}
        colors={["#E92548", "#0AC46B"]}
        percent={value}
        arcPadding={0.01}
        style={{ width: "100%" }}
        cornerRadius={0}
        hideText={true}
        formatTextValue={val => val}
      />
    );
  };

  const renderSpedometerChart = () => {
    return (
      <ReactSpeedometer
        forceRender={true}
        segments={2}
        customSegmentStops={[0, target, 100]}
        customSegmentLabels={[
          {
            position: "OUTSIDE",
            fontSize: "12px",
            color: "black",
          },
          {
            text: `${target}%`,
            position: "OUTSIDE",
            fontSize: "12px",
            color: "black",
          },
        ]}
        segmentColors={["#E92548", "#0AC46B"]}
        value={value}
        minValue={0}
        maxValue={100}
        currentValueText={`${title} ${value}%`}
        textColor={value < target ? "#e92548" : "#0AC46B"}
        width={250}
        height={200}
        ringWidth={40}
        paddingHorizontal={10}
      />
    );
  };
  return (
    <div className={classNames(Styles.container, classContainer)}>
      {/* {renderGaugeChart()} */}
      {renderSpedometerChart()}
      {/* <div className={Styles.titleContainer}>
        <span className={Styles.title}>{title}</span>
        <span
          className={classNames(Styles.value, { [Styles.red]: value < target })}
        >{`${value * 100}%`}</span>
      </div>
      <div className={Styles.titleContainer}>
        <span className={Styles.title}>Target</span>
        <span>{`${target * 100}%`}</span>
      </div> */}
    </div>
  );
}
