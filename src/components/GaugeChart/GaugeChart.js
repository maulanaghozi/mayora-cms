import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import classNames from "classnames";
import Styles from "./GaugeChart.module.scss";
import "./styles.css";

export default function GaugeChartOEE(props) {
  const { title, target, value, classContainer, style } = props;

  const handleStyle = () => {
    const width = window.screen.width;

    if (width < 960) {
      return { width: "80px", height: "56px" };
    } else if (width < 1280 && width >= 960) {
      return { width: "160px", height: "113px" };
    } else if (width < 1600 && width >= 1280) {
      return { width: "240px", height: "190px" };
    } else if (width < 1920 && width >= 1600) {
      return { width: "320px", height: "227px" };
    } else if (width < 3200 && width >= 1920) {
      return { width: "410px", height: "280px" };
    } else if (width >= 3200) {
      return { width: "720px", height: "490px" };
    }
  };

  const handleRingWidth = () => {
    const width = window.screen.width;

    if (width < 960) {
      return 20;
    } else if (width < 1280 && width >= 960) {
      return 20;
    } else if (width < 1600 && width >= 1280) {
      return 35;
    } else if (width < 1920 && width >= 1600) {
      return 50;
    } else if (width < 3200 && width >= 1920) {
      return 60;
    } else if (width >= 3200) {
      return 90;
    }
  };

  const handlevalueTextFontSize = () => {
    const width = window.screen.width;

    if (width < 960) {
      return "16px";
    } else if (width < 1280 && width >= 960) {
      return "18px";
    } else if (width < 1600 && width >= 1280) {
      return "22px";
    } else if (width < 1920 && width >= 1600) {
      return "26px";
    } else if (width < 3200 && width >= 1920) {
      return "30px";
    } else if (width >= 3200) {
      return "50px";
    }
  };

  const handlePaddingVertical = () => {
    const width = window.screen.width;

    if (width < 960) {
      return 10;
    } else if (width < 1280 && width >= 960) {
      return 10;
    } else if (width < 1600 && width >= 1280) {
      return 10;
    } else if (width < 1920 && width >= 1600) {
      return 20;
    } else if (width < 3200 && width >= 1920) {
      return 30;
    } else if (width >= 3200) {
      return 40;
    }
  };

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
        fluidWidth={true}
        ringWidth={handleRingWidth()}
        paddingHorizontal={10}
        valueTextFontSize={handlevalueTextFontSize()}
        paddingVertical={handlePaddingVertical()}
      />
    );
  };
  return (
    <div
      className={classNames(Styles.container, classContainer)}
      style={handleStyle()}
    >
      {renderSpedometerChart()}
    </div>
  );
}
