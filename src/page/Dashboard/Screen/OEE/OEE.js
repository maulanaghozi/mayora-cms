import React from "react";
import GaugeChart from "../../../../components/GaugeChart/GaugeChart";
import Styles from "./OEE.module.scss";

export default function OEE() {
  const renderLine1 = () => {
    return <div></div>;
  };

  const renderLine2 = () => {
    return <div></div>;
  };
  return (
    <div>
      {renderLine1()}
      {renderLine2()}
    </div>
  );
}
