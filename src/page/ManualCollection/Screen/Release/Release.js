import React, { useState, useEffect } from "react";
import Styles from "./Release.module.scss";
import { http } from "../../../../utility/http";

export default function Release(props) {
  const [actual, setActual] = useState(0);
  const { date, machineId } = props;

  useEffect(() => {
    console.log(props);
  }, []);

  const handleChange = e => {
    if (e.target.name === "actual") {
      setActual(e.target.value);
    }
  };

  const getActual = () => {
    const params = {
      method: "GET",
      path: "",
    };
  };

  const handleSave = () => {};

  const renderReleaseBySystem = () => {
    return (
      <div className={Styles.releaseBySystem}>
        <div className={Styles.shiftContainer}>
          <div className={Styles.shiftWrapper}>
            <span className={Styles.shift}>Shift 1</span>
            <span className={Styles.amount}>0</span>
          </div>
          <div className={Styles.shiftWrapper}>
            <span className={Styles.shift}>Shift 2</span>
            <span className={Styles.amount}>0</span>
          </div>
          <div className={Styles.shiftWrapper}>
            <span className={Styles.shift}>Shift 3</span>
            <span className={Styles.amount}>0</span>
          </div>
        </div>
        <div className={Styles.totalReleaseBySystem}>
          <span className={Styles.shift}>Total Release by System</span>
          <span className={Styles.amount}>0</span>
        </div>
      </div>
    );
  };

  const renderActualRelease = () => {
    return (
      <div className={Styles.actualRelease}>
        <span>Total Actual Release</span>
        <input
          name={"actual"}
          value={actual}
          className={Styles.input}
          onChange={handleChange}
        />
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
