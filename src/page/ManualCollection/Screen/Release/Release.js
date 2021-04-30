import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Styles from "./Release.module.scss";
import { Context } from "../../../../hooks/context";
import { http } from "../../../../utility/http";

export default function Release(props) {
  const [actual, setActual] = useState(0);
  const [shift1, setShift1] = useState(0);
  const [shift2, setShift2] = useState(0);
  const [shift3, setShift3] = useState(0);
  const [total, setTotal] = useState(0);
  const globalState = useContext(Context);

  const { dateSelected, machine, profile } = globalState;

  useEffect(() => {
    getActual();
    getTotal();
    getShift1();
    getShift2();
    getShift3();
  }, [dateSelected, machine.machineId]);

  const handleChange = e => {
    if (e.target.name === "actual") {
      setActual(e.target.value);
    }
  };

  const getTotal = async () => {
    const date = moment(dateSelected * 1000).format("YYYY MM DD");
    const startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    const endTime = moment(startTime).add(1, "days").format("YYYY MM DD HH:mm");

    const params = {
      method: "GET",
      path: "release/last",
      query: {
        machineId: machine.machineId,
        startTime: startTime,
        endTime: endTime,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        console.log("success ", result.payload);
        setTotal(result.payload.amount);
      } else {
        setTotal(0);
      }
    } else {
      console.log("error ", result);
    }
  };
  const getShift1 = async () => {
    const date = moment(dateSelected * 1000).format("YYYY MM DD");
    const startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    const endTime = moment(`${date} 15:00`).format("YYYY MM DD HH:mm");

    const params = {
      method: "GET",
      path: "release/last",
      query: {
        machineId: machine.machineId,
        startTime: startTime,
        endTime: endTime,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        setShift1(result.payload.amount);
      } else {
        setShift1(0);
      }
    } else {
      console.log("error ", result);
    }
  };
  const getShift2 = async () => {
    const date = moment(dateSelected * 1000).format("YYYY MM DD");
    const startTime = moment(`${date} 15:00`).format("YYYY MM DD HH:mm");
    const endTime = moment(`${date} 23:00`).format("YYYY MM DD HH:mm");

    const params = {
      method: "GET",
      path: "release/last",
      query: {
        machineId: machine.machineId,
        startTime: startTime,
        endTime: endTime,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        setShift2(result.payload.amount);
      } else {
        setShift2(0);
      }
    } else {
      console.log("error ", result);
    }
  };
  const getShift3 = async () => {
    const date = moment(dateSelected * 1000).format("YYYY MM DD");
    const nextDate = moment(date).add(1, "days").format("YYYY MM DD");
    const startTime = moment(`${date} 23:00`).format("YYYY MM DD HH:mm");
    const endTime = moment(`${nextDate} 07:00`).format("YYYY MM DD HH:mm");

    const params = {
      method: "GET",
      path: "release/last",
      query: {
        machineId: machine.machineId,
        startTime: startTime,
        endTime: endTime,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        setShift3(result.payload.amount);
      } else {
        setShift3(0);
      }
    } else {
      console.log("error ", result);
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
            <span className={Styles.amount}>{shift1}</span>
          </div>
          <div className={Styles.shiftWrapper}>
            <span className={Styles.shift}>Shift 2</span>
            <span className={Styles.amount}>{shift2}</span>
          </div>
          <div className={Styles.shiftWrapper}>
            <span className={Styles.shift}>Shift 3</span>
            <span className={Styles.amount}>{shift3}</span>
          </div>
        </div>
        <div className={Styles.totalReleaseBySystem}>
          <span className={Styles.shift}>Total Release by System</span>
          <span className={Styles.amount}>{total}</span>
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
