import React from "react";
import moment from "moment";
import Styles from "./Release.module.scss";

export default function Release() {
  const renderReleaseBySystem = () => {
    return (
      <div className={Styles.releaseBySystem}>
        <div className={Styles.shiftContainer}>
          <div className={Styles.shiftWrapper}>
            <span>Shift 1</span>
            <span>708</span>
          </div>
          <div className={Styles.shiftWrapper}>
            <span>Shift 2</span>
            <span>590</span>
          </div>
          <div className={Styles.shiftWrapper}>
            <span>Shift 3</span>
            <span>1002</span>
          </div>
        </div>
        <div>
          <span>Total Release by System</span>
          <span>2300</span>
        </div>
      </div>
    );
  };

  const renderActualRelease = () => {
    return (
      <div>
        <span>Total Actual Release</span>
        <input />
        <div>
          <button>Cancel</button>
          <button>Save</button>
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
