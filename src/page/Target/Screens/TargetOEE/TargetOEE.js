import React from "react";
import TargetOEETable from "../../Tables/TargetOEE/TargetOEETable";
import Styles from "./TargetOEE.module.scss";

export default function TargetOEE() {
  const renderTargetOEE = () => {
    return (
      <div className={Styles.cardTarget}>
        <div className={Styles.titleContainer}>
          <span className={Styles.title}>OEE Target</span>
        </div>
        <div className={Styles.targetValueContainer}>
          <span className={Styles.targetValue}>90%</span>
          <span className={Styles.edit}>Edit</span>
        </div>
      </div>
    );
  };

  const renderTable = () => {
    return <TargetOEETable />;
  };
  return (
    <div className={Styles.container}>
      {renderTargetOEE()}
      {renderTable()}
    </div>
  );
}
