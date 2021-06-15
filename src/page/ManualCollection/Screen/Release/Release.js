import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Styles from "./Release.module.scss";
import { Context } from "../../../../hooks/context";
import { http } from "../../../../utility/http";
import { EditIcon } from "../../../../assets/icons/index";
import { LoadingModal } from "../../../../components/Modal";

export default function Release(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [actual, setActual] = useState(0);
  const [currentActual, setCurrentActual] = useState(0);
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
    let date = moment(dateSelected * 1000).format("YYYY MM DD");
    let startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let endTime = moment(startTime).add(1, "days").format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(startTime) - new Date(curentTime)) / 1000;
    const msa = (new Date(startTime) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      date = moment(date).subtract(1, "days").format("YYYY MM DD");
      startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
      endTime = moment(startTime).add(1, "days").format("YYYY MM DD HH:mm");
    }
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
    let date = moment(dateSelected * 1000).format("YYYY MM DD");
    let startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let endTime = moment(`${date} 15:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(startTime) - new Date(curentTime)) / 1000;
    const msa = (new Date(startTime) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      date = moment(date).subtract(1, "days").format("YYYY MM DD");
      startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
      endTime = moment(`${date} 15:00`).format("YYYY MM DD HH:mm");
    }

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
    let date = moment(dateSelected * 1000).format("YYYY MM DD");
    let startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let endTime = moment(`${date} 23:00`).format("YYYY MM DD HH:mm");
    let startDate = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(startDate) - new Date(curentTime)) / 1000;
    const msa = (new Date(startDate) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      date = moment(date).subtract(1, "days").format("YYYY MM DD");
      startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
      endTime = moment(`${date} 23:00`).format("YYYY MM DD HH:mm");
    }

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
    let date = moment(dateSelected * 1000).format("YYYY MM DD");
    let nextDate = moment(date).add(1, "days").format("YYYY MM DD");
    let startTime = moment(`${date} 23:00`).format("YYYY MM DD HH:mm");
    let endTime = moment(`${nextDate} 07:00`).format("YYYY MM DD HH:mm");
    let startDate = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(startDate) - new Date(curentTime)) / 1000;
    const msa = (new Date(startDate) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      date = moment(date).subtract(1, "days").format("YYYY MM DD");
      nextDate = moment(date).add(1, "days").format("YYYY MM DD");
      startTime = moment(`${date} 23:00`).format("YYYY MM DD HH:mm");
      endTime = moment(`${nextDate} 07:00`).format("YYYY MM DD HH:mm");
    }

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
    let date = moment(dateSelected * 1000).format("YYYY-MM-DD");
    let startDate = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(startDate) - new Date(curentTime)) / 1000;
    const msa = (new Date(startDate) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      date = moment(date).subtract(1, "days").format("YYYY MM DD");
    }

    const params = {
      method: "GET",
      path: "actual-release",
      query: {
        machineId: machine.machineId,
        date: date,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        console.log("success ", result.payload);
        setActual(result.payload.amount);
        setCurrentActual(result.payload.amount);
      } else {
        setActual(0);
        setCurrentActual(0);
      }
    } else {
      console.log("error ", result);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    let date = moment(dateSelected * 1000).format("YYYY-MM-DD");
    let startDate = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(startDate) - new Date(curentTime)) / 1000;
    const msa = (new Date(startDate) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      date = moment(date).subtract(1, "days").format("YYYY MM DD");
    }

    const params = {
      method: "POST",
      path: "actual-release",
      data: {
        machineId: machine.machineId,
        date: date,
        amount: actual,
        updatedBy: profile.name,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        getActual();
        setIsEdit(false);
      }
    } else {
      console.log("error ", result);
    }

    setIsLoading(false);
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
            <span className={Styles.amount}>{shift2 - shift1}</span>
          </div>
          <div className={Styles.shiftWrapper}>
            <span className={Styles.shift}>Shift 3</span>
            <span className={Styles.amount}>{total - shift2}</span>
          </div>
        </div>
        <div className={Styles.totalReleaseBySystem}>
          <span className={Styles.shift}>Total Output by System</span>
          <span className={Styles.amount}>{total}</span>
        </div>
      </div>
    );
  };

  const renderActualRelease = () => {
    return (
      <div className={Styles.actualRelease}>
        <span>Total Actual Release</span>
        <div className={Styles.displayActual}>
          <span>{currentActual}</span>
          <EditIcon
            onClick={() => {
              setIsEdit(true);
            }}
          />
        </div>
        {isEdit && (
          <>
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
                  setIsEdit(false);
                }}
                className={Styles.cancel}
              >
                Cancel
              </button>
              <button onClick={() => handleSave()} className={Styles.save}>
                Save
              </button>
            </div>
          </>
        )}
      </div>
    );
  };
  return (
    <div className={Styles.container}>
      {renderReleaseBySystem()}
      {renderActualRelease()}
      {isLoading && <LoadingModal />}
    </div>
  );
}
