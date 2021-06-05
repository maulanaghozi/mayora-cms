import React, { useState, useEffect } from "react";
import moment from "moment";
import { http } from "../../../../utility/http";
import { ProductionPlanning } from "../../../../components/ProductionOutputPlanning/ProductionOutputPlanning";
import BarChart from "../../../../components/BarChart/BarChart";
import Styles from "./ProductionOutput.module.scss";

export default function ProductionOutput() {
  const [target1, setTarget1] = useState(0);
  const [target2, setTarget2] = useState(0);
  const [targetProrata1, setTargetProrata1] = useState(0);
  const [targetProrata2, setTargetProrata2] = useState(0);
  const [dataTarget1, setDataTarget1] = useState([]);
  const [dataTarget2, setDataTarget2] = useState([]);
  const [actual1, setActual1] = useState(0);
  const [actual2, setActual2] = useState(0);
  const [status1, setStatus1] = useState("running");
  const [status2, setStatus2] = useState("running");
  const [dataRelease1, setDataRelease1] = useState([]);
  const [dataRelease2, setDataRelease2] = useState([]);
  const [releaseIsReady1, setReleaseIsReady1] = useState(false);
  const [releaseIsReady2, setReleaseIsReady2] = useState(false);
  const [maxValue1, setMaxValue1] = useState(0);
  const [maxValue2, setMaxValue2] = useState(0);

  useEffect(() => {
    getTroublelist();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof getTroublelist === "function") {
        getTroublelist();
      }
    }, 30000);

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
    getDataRelease1();
    getDataRelease2();
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

  const handleDataRelease = (data, machine) => {
    if (!Array.isArray(data)) return;

    const releases = [];
    let maxValue = 0;

    let hour = 7;
    for (let i = 0; i < 24; i++) {
      if (hour === 24) hour = 0;

      const result = data.find(item => item.time === hour);
      const amount = result ? result.amount : 0;

      if (amount > maxValue) maxValue = amount;

      releases.push(amount);
      hour++;
    }

    if (machine === 1) {
      setDataRelease1(releases);
      setMaxValue1(maxValue);
      setReleaseIsReady1(true);
    } else {
      setDataRelease2(releases);
      setMaxValue2(maxValue);
      setReleaseIsReady2(true);
    }
  };

  const getDataRelease1 = async () => {
    let date = moment().format("YYYY-MM-DD");
    let startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(startTime) - new Date(curentTime)) / 1000;
    const msa = (new Date(startTime) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      date = moment(date).subtract(1, "days").format("YYYY-MM-DD");
    }

    const params = {
      method: "GET",
      path: "release/total",
      query: {
        machineId: "00f5eafd-89c5-4871-a982-26a8180774c7",
        date: date,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (Array.isArray(result.payload)) {
        handleDataRelease(result.payload, 1);
      } else {
        setDataRelease1([]);
      }
    } else {
      console.log("error ", result);
    }
  };

  const getDataRelease2 = async () => {
    let date = moment().format("YYYY-MM-DD");
    let startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(startTime) - new Date(curentTime)) / 1000;
    const msa = (new Date(startTime) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      date = moment(date).subtract(1, "days").format("YYYY-MM-DD");
    }

    const params = {
      method: "GET",
      path: "release/total",
      query: {
        machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
        date: date,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (Array.isArray(result.payload)) {
        handleDataRelease(result.payload, 2);
      } else {
        setDataRelease2([]);
      }
    } else {
      console.log("error ", result);
    }
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
    let date = moment().format("YYYY-MM-DD");
    let startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(startTime) - new Date(curentTime)) / 1000;
    const msa = (new Date(startTime) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      date = moment(date).subtract(1, "days").format("YYYY-MM-DD");
    }

    const params = {
      method: "GET",
      path: "production-target/target",
      query: {
        machineId: "00f5eafd-89c5-4871-a982-26a8180774c7",
        date: date,
      },
    };

    const result = await http(params);
    if (result && result.code === "success") {
      setTarget1(result.payload.target);
      setTargetProrata1(result.payload.targetProrata);
      const targetData = await hanldeDataTarget(result.payload.targetProrata);
      setDataTarget1(targetData);
    } else {
      setTargetProrata1(0);
      setTarget1(0);
    }
  };

  const getProductionTarget2 = async () => {
    let date = moment().format("YYYY-MM-DD");
    let startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(startTime) - new Date(curentTime)) / 1000;
    const msa = (new Date(startTime) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      date = moment(date).subtract(1, "days").format("YYYY-MM-DD");
    }

    const params = {
      method: "GET",
      path: "production-target/target",
      query: {
        machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
        date: date,
      },
    };

    const result = await http(params);
    if (result && result.code === "success" && result.payload) {
      setTarget2(result.payload.target);
      setTargetProrata2(result.payload.targetProrata);
      const targetData = await hanldeDataTarget(result.payload.targetProrata);
      setDataTarget2(targetData);
    } else {
      setTargetProrata2(0);
      setTarget2(0);
    }
  };

  const getActual1 = async () => {
    let date = moment().format("YYYY-MM-DD");
    let curentTime = moment().format("YYYY MM DD HH:mm");
    let startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let endTime = moment(startTime).add(1, "days").format("YYYY MM DD HH:mm");

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
        machineId: "00f5eafd-89c5-4871-a982-26a8180774c7",
        startTime: startTime,
        endTime: endTime,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
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
    let curentTime = moment().format("YYYY MM DD HH:mm");
    let startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let endTime = moment(startTime).add(1, "days").format("YYYY MM DD HH:mm");

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
        machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
        startTime: startTime,
        endTime: endTime,
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
          {Array.isArray(dataTarget1) &&
            dataTarget1.length > 0 &&
            releaseIsReady1 && (
              <BarChart
                dataTarget={dataTarget1}
                target={targetProrata1 > maxValue1 ? targetProrata1 : maxValue1}
                dataRelease={dataRelease1}
              />
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
            target2 > 0 &&
            releaseIsReady2 && (
              <BarChart
                dataTarget={dataTarget2}
                target={targetProrata2 > maxValue2 ? targetProrata2 : maxValue2}
                dataRelease={dataRelease2}
              />
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
