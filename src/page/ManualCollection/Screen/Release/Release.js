import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Styles from "./Release.module.scss";
import { Context } from "../../../../hooks/context";
import { http } from "../../../../utility/http";

export default function Release(props) {
  const [actual, setActual] = useState(0);
  const globalState = useContext(Context);

  const { dateSelected, machine, profile } = globalState;

  useEffect(() => {
    getActual();
  }, [dateSelected, machine.machineId]);

  const handleChange = e => {
    if (e.target.name === "actual") {
      setActual(e.target.value);
    }
  };

  const getActual = async () => {
    const params = {
      method: "GET",
      path: "actual-release",
      query: {
        machineId: machine.machineId,
        date: moment(dateSelected * 1000).format("YYYY-MM-DD"),
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        console.log("success ", result.payload);
        setActual(result.payload.amount);
      } else {
        setActual(0);
      }
    } else {
      console.log("error ", result);
    }
  };

  const handleSave = async () => {
    const params = {
      method: "POST",
      path: "actual-release",
      data: {
        machineId: machine.machineId,
        date: moment(dateSelected * 1000).format("YYYY-MM-DD"),
        amount: actual,
        updatedBy: profile.name,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        console.log("success ", result.payload);
      }
    } else {
      console.log("error ", result);
    }
  };

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
          <button
            onClick={() => {
              getActual();
            }}
            className={Styles.cancel}
          >
            Cancel
          </button>
          <button onClick={() => handleSave()} className={Styles.save}>
            Save
          </button>
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
