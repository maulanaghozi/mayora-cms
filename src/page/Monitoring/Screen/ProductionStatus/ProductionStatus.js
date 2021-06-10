import React, { useState, useEffect } from "react";
import moment from "moment";
import { http } from "../../../../utility/http";
import { ProductionStatusBar } from "../../../../components/ProductionStatus/ProductionStatus";
import { ProductionPlanning } from "../../../../components/ProductionPlaning/ProductionPlaning";

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

export default function ProductionStatus() {
  const [dataStatus1, setDataStatus1] = useState([]);
  const [dataStatus2, setDataStatus2] = useState([]);
  const [minutesPass, setMinutesPass] = useState(0);
  const [startTime, setStartTime] = useState(GetTime().getThisDay07);
  const [endTime, setEndTime] = useState(GetTime().endTime);
  const [target1, setTarget1] = useState(0);
  const [target2, setTarget2] = useState(0);
  const [actual1, setActual1] = useState(0);
  const [actual2, setActual2] = useState(0);
  const [status1, setStatus1] = useState("running");
  const [status2, setStatus2] = useState("running");

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      handleMinutesPass();
      getTroublelist();
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof getTroublelist === "function") {
        getTroublelist();
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getTroublelist = () => {
    getStatus1();
    getStatus2();
    getProductionTarget1();
    getProductionTarget2();
    getActual1();
    getActual2();
    getRealtimeStatus1();
    getRealtimeStatus2();
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

  const getStatus1 = async () => {
    const params = {
      method: "GET",
      path: "trouble",
      query: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        machineId: "00f5eafd-89c5-4871-a982-26a8180774c7",
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      setDataStatus1(result.payload.results);
    } else {
      console.log(result);
      alert("please contact administrator");
      setDataStatus1([]);
    }
  };

  const getStatus2 = async () => {
    const params = {
      method: "GET",
      path: "trouble",
      query: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      setDataStatus2(result.payload.results);
    } else {
      console.log(result);
      alert("please contact administrator");
      setDataStatus2([]);
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
    } else {
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
        setActual2(result.payload.amount);
      } else {
        setActual2(0);
      }
    } else {
      console.log("error ", result);
    }
  };

  const handleMinutesPass = () => {
    let getDays = moment().format("YYYY MM DD");
    let curentTime = moment().format("YYYY MM DD HH:mm");
    let startDay = moment(`${getDays} 07:00`).format("YYYY MM DD HH:mm");
    let endDay = moment(startDay).add(1, "days").format("YYYY MM DD HH:mm");

    if (curentTime < startDay) {
      getDays = moment(getDays).subtract(1, "days").format("YYYY MM DD");
      startDay = moment(`${getDays} 07:00`).format("YYYY MM DD HH:mm");
      endDay = moment(startDay).add(1, "days").format("YYYY MM DD HH:mm");
    }

    setStartTime(startDay);
    setEndTime(endDay);

    const ms = Math.abs(new Date(curentTime) - new Date(startDay)) / 1000;

    if (ms < 86400) {
      setMinutesPass(ms / 60);
    }
  };

  const renderProductionPlaningLine1 = () => {
    return (
      <ProductionPlanning
        machineName={"line 1"}
        target={Number(target1)}
        actual={actual1}
        status={status1}
      />
    );
  };

  const renderProductionStatusLine1 = () => {
    return (
      <ProductionStatusBar
        machineName={"Line 1"}
        data={dataStatus1}
        minutesPass={minutesPass}
      />
    );
  };

  const renderProductionPlaningLine2 = () => {
    return (
      <ProductionPlanning
        machineName={"line 2"}
        target={Number(target2)}
        actual={actual2}
        status={status2}
      />
    );
  };

  const renderProductionStatusLine2 = () => {
    return (
      <ProductionStatusBar
        machineName={"Line 2"}
        data={dataStatus2}
        minutesPass={minutesPass}
      />
    );
  };

  return (
    <div style={{ paddingBottom: 50 }}>
      {renderProductionPlaningLine1()}
      {renderProductionStatusLine1()}
      {renderProductionPlaningLine2()}
      {renderProductionStatusLine2()}
    </div>
  );
}
