import React, { useState, useEffect } from "react";
import moment from "moment";
import classNames from "classnames";
import { http } from "../../../../utility/http";
import { ProductionPlanning } from "../../../../components/ProductionOutputPlanning/ProductionOutputPlanning";
import BarChart from "../../../../components/BarChart/BarChart";
import Styles from "./ProductionOutput.module.scss";

const GetTime = () => {
  let totalMinutes = 1440;
  let getThisDay = moment().format("YYYY MM DD");
  let curentTime = moment().format("YYYY MM DD HH:mm");
  let getThisDay07 = moment(`${getThisDay} 07:00`).format("YYYY MM DD HH:mm");
  let endTime = moment(getThisDay07).add(1, "days").format("YYYY MM DD HH:mm");

  if (curentTime < getThisDay07) {
    getThisDay = moment(getThisDay).subtract(1, "days").format("YYYY MM DD");
    getThisDay07 = moment(`${getThisDay} 07:00`).format("YYYY MM DD HH:mm");
    endTime = moment(getThisDay07).add(1, "days").format("YYYY MM DD HH:mm");
  }

  return {
    totalMinutes,
    getThisDay,
    getThisDay07,
    endTime,
  };
};

export default function ProductionOutput() {
  const [startTime, setStartTime] = useState(GetTime().getThisDay07);
  const [endTime, setEndTime] = useState(GetTime().endTime);
  const [target1, setTarget1] = useState(0);
  const [target2, setTarget2] = useState(0);
  const [dataTarget1, setDataTarget1] = useState([]);
  const [dataTarget2, setDataTarget2] = useState([]);
  const [actual1, setActual1] = useState(0);
  const [actual2, setActual2] = useState(0);
  const [status1, setStatus1] = useState("running");
  const [status2, setStatus2] = useState("running");

  useEffect(() => {
    getTroublelist();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof getTroublelist === "function") {
        getTroublelist();
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getTroublelist = () => {
    getProductionTarget1();
    getProductionTarget2();
    getActual1();
    getActual2();
    getRealtimeStatus1();
    getRealtimeStatus2();
  };

  const hanldeDataTarget = async target => {
    target = Number(target);
    const pembagi = 24; //24 jam

    let targetHour = target / 24;
    targetHour = Math.round(targetHour);

    const data = [];

    for (let i = 1; i <= 24; i++) {
      data.push(targetHour * i);
    }

    console.log({ target, data });
    return data;
  };

  const getRealtimeStatus1 = async () => {
    const params = {
      method: "GET",
      path: "status-machine",
      query: {
        machineId: "00f5eafd-89c5-4871-a982-26a8180774c7",
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        setStatus1(result.payload.status);
      } else {
        setStatus1("disconnected");
      }
    } else {
      alert("please contact administrator");
      setStatus1("disconnected");
    }
  };

  const getRealtimeStatus2 = async () => {
    const params = {
      method: "GET",
      path: "status-machine",
      query: {
        machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        setStatus2(result.payload.status);
      } else {
        setStatus2("disconnected");
      }
    } else {
      alert("please contact administrator");
      setStatus2("disconnected");
    }
  };

  const getProductionTarget1 = async () => {
    const params = {
      method: "GET",
      path: "production-target/target",
      query: {
        machineId: "00f5eafd-89c5-4871-a982-26a8180774c7",
      },
    };

    const result = await http(params);
    if (result && result.code === "success") {
      setTarget1(result.payload.target);
      const targetData = await hanldeDataTarget(result.payload.target);
      setDataTarget1(targetData);
    } else {
      setTarget1(0);
    }
  };

  const getProductionTarget2 = async () => {
    const params = {
      method: "GET",
      path: "production-target/target",
      query: {
        machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
      },
    };

    const result = await http(params);
    if (result && result.code === "success") {
      setTarget2(result.payload.target);
      const targetData = await hanldeDataTarget(result.payload.target);
      setDataTarget2(targetData);
    } else {
      setTarget2(0);
    }
  };

  const getActual1 = async () => {
    let date = moment().format("YYYY-MM-DD");
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
        machineId: "00f5eafd-89c5-4871-a982-26a8180774c7",
        date: date,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        console.log("success ", result.payload);
        setActual1(result.payload.amount);
      } else {
        setActual1(0);
      }
    } else {
      console.log("error ", result);
    }
  };

  const getActual2 = async () => {
    let date = moment().format("YYYY-MM-DD");
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
        machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
        date: date,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        console.log("success ", result.payload);
        setActual2(result.payload.amount);
      } else {
        setActual2(0);
      }
    } else {
      console.log("error ", result);
    }
  };

  const renderLine1 = () => {
    return (
      <div className={Styles.lineContainer}>
        <ProductionPlanning
          styleContainer={Styles.planning}
          machineName={"line 1"}
          target={target1}
          actual={actual1}
          status={status1}
        />
        <div className={Styles.chart}>
          {Array.isArray(dataTarget1) && dataTarget1.length > 0 && (
            <BarChart dataTarget={dataTarget1} target={target1} />
          )}
        </div>
      </div>
    );
  };

  const renderLine2 = () => {
    return (
      <div className={Styles.lineContainer}>
        <ProductionPlanning
          styleContainer={Styles.planning}
          machineName={"line 2"}
          target={target2}
          actual={actual2}
          status={status2}
        />
        <div className={Styles.chart}>
          {Array.isArray(dataTarget2) &&
            dataTarget2.length > 0 &&
            target2 > 0 && (
              <BarChart dataTarget={dataTarget2} target={target2} />
            )}
        </div>
      </div>
    );
  };

  return (
    <div className={Styles.container}>
      {renderLine1()}
      {renderLine2()}
    </div>
  );
}
