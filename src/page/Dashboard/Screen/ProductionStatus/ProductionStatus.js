import React, { useState, useEffect } from "react";
import moment from "moment";
import classNames from "classnames";
import { http } from "../../../../utility/http";
import { ProductionStatusBar } from "../../../../components/ProductionStatus/ProductionStatus";

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

  useEffect(() => {
    handleMinutesPass();
    getTroublelist();
  }, []);

  const getTroublelist = async () => {
    await getStatus1();
    await getStatus2();
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

  const renderProductionPlaningLine1 = () => {};
  const renderProductionStatusLine1 = () => {
    return (
      <ProductionStatusBar
        machineName={"Line 1"}
        data={dataStatus1}
        minutesPass={minutesPass}
      />
    );
  };
  const renderProductionPlaningLine2 = () => {};
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
    <div>
      {renderProductionStatusLine1()}
      {renderProductionStatusLine2()}
    </div>
  );
}
