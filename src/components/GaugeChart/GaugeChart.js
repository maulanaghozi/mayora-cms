import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import classNames from "classnames";
import Styles from "./GaugeChart.module.scss";
import "./styles.css";

export default function GaugeChartOEE(props) {
  const { title, target, value, classContainer } = props;

  const renderSpedometerChart = () => {
    return (
      <ReactSpeedometer
        forceRender={true}
        segments={2}
        customSegmentStops={[0, target, 100]}
        segmentColors={["#E92548", "#0AC46B"]}
        value={value}
        minValue={0}
        maxValue={100}
        currentValueText={`${title} ${value}%`}
        textColor={"#000000"}
        width={250}
        height={200}
        ringWidth={40}
        paddingHorizontal={10}
      />
    );
  };
  return (
    <div className={classNames(Styles.container, classContainer)}>
      {renderSpedometerChart()}
    </div>
  );
}
