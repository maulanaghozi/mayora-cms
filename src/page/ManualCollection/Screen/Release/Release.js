import React from "react";
import Styles from "./Release.module.scss";

export default function Release() {
  const renderReleaseBySystem = () => {
    return (
      <div className={Styles.releaseBySystem}>
        <div className={Styles.shiftContainer}>
          <div className={Styles.shiftWrapper}>
            <span className={Styles.shift}>Shift 1</span>
            <span className={Styles.amount}>708</span>
          </div>
          <div className={Styles.shiftWrapper}>
            <span className={Styles.shift}>Shift 2</span>
            <span className={Styles.amount}>590</span>
          </div>
          <div className={Styles.shiftWrapper}>
            <span className={Styles.shift}>Shift 3</span>
            <span className={Styles.amount}>1002</span>
          </div>
        </div>
        <div className={Styles.totalReleaseBySystem}>
          <span className={Styles.shift}>Total Release by System</span>
          <span className={Styles.amount}>2300</span>
        </div>
      </div>
    );
  };

  const renderActualRelease = () => {
    return (
      <div className={Styles.actualRelease}>
        <span>Total Actual Release</span>
        <input value={2300} className={Styles.input} />
        <div className={Styles.buttonContainer}>
          <button className={Styles.cancel}>Cancel</button>
          <button className={Styles.save}>Save</button>
        </div>
      </div>
    );
  };
  return (
    <div className={Styles.container}>
      {renderReleaseBySystem()}
      {renderActualRelease()}
    </div>
  );
}
