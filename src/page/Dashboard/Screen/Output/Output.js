import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Styles from "./Output.module.scss";
import { http } from "../../../../utility/http";
import { Context } from "../../../../hooks/context";

export default function Output() {
  //Line 1
  const [line1Shift1, setLine1Shift1] = useState(0);
  const [line1Shift2, setLine1Shift2] = useState(0);
  const [line1Total, setLine1Total] = useState(0);

  //Line 2
  const [line2Shift1, setLine2Shift1] = useState(0);
  const [line2Shift2, setLine2Shift2] = useState(0);
  const [line2Total, setLine2Total] = useState(0);

  //OEE
  const [date, setDate] = useState(moment().format("DD MMM YYYY"));

  //context
  const globalState = useContext(Context);
  const { adminProfile } = globalState;

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof init === "function") {
        init();
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const init = () => {
    getTotalLine1();
    getTotalLine2();
    getShift1Line1();
    getShift1Line2();
    getShift2Line1();
    getShift2Line2();
  };

  //Get Total Output By System
  const getTotalLine1 = async () => {
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
        setLine1Total(result.payload.amount);
      } else {
        setLine1Total(0);
      }
    } else {
      console.log("error ", result);
    }
  };

  const getTotalLine2 = async () => {
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
        setLine2Total(result.payload.amount);
      } else {
        setLine2Total(0);
      }
    } else {
      console.log("error ", result);
    }
  };

  //Shift 1
  const getShift1Line1 = async () => {
    let date = moment().format("YYYY MM DD");
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
        machineId: "00f5eafd-89c5-4871-a982-26a8180774c7",
        startTime: startTime,
        endTime: endTime,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        setLine1Shift1(result.payload.amount);
      } else {
        setLine1Shift1(0);
      }
    } else {
      console.log("error ", result);
    }
  };

  const getShift1Line2 = async () => {
    let date = moment().format("YYYY MM DD");
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
        machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
        startTime: startTime,
        endTime: endTime,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        setLine2Shift1(result.payload.amount);
      } else {
        setLine2Shift1(0);
      }
    } else {
      console.log("error ", result);
    }
  };

  //Shift 2
  const getShift2Line1 = async () => {
    let date = moment().format("YYYY MM DD");
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
        machineId: "00f5eafd-89c5-4871-a982-26a8180774c7",
        startTime: startTime,
        endTime: endTime,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        setLine1Shift2(result.payload.amount);
      } else {
        setLine1Shift2(0);
      }
    } else {
      console.log("error ", result);
    }
  };

  const getShift2Line2 = async () => {
    let date = moment().format("YYYY MM DD");
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
        machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
        startTime: startTime,
        endTime: endTime,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        setLine2Shift2(result.payload.amount);
      } else {
        setLine2Shift2(0);
      }
    } else {
      console.log("error ", result);
    }
  };

  const renderHeader = (machineName, target) => {
    return (
      <div className={Styles.header}>
        <div className={Styles.dataWrapper}>
          <span>Type</span>
          <h1 className={Styles.type}>{machineName}</h1>
        </div>
        <div className={Styles.dataWrapper}>
          <span>Date</span>
          <h1>{date}</h1>
        </div>
      </div>
    );
  };
  const renderChart1 = () => {
    return (
      <div className={Styles.releaseBySystem}>
        <div className={Styles.shiftContainer}>
          <div className={Styles.shiftWrapper}>
            <span className={Styles.shift}>Shift 1</span>
            <span className={Styles.amount}>{line1Shift1}</span>
          </div>
          <div className={Styles.shiftWrapper}>
            <span className={Styles.shift}>Shift 2</span>
            <span className={Styles.amount}>{line1Shift2 - line1Shift1}</span>
          </div>
          <div className={Styles.shiftWrapper}>
            <span className={Styles.shift}>Shift 3</span>
            <span className={Styles.amount}>{line1Total - line1Shift2}</span>
          </div>
        </div>
        <div className={Styles.totalReleaseBySystem}>
          <span className={Styles.shift}>Total Output by System</span>
          <span className={Styles.amount}>{line1Total}</span>
        </div>
      </div>
    );
  };

  const renderChart2 = () => {
    return (
      <div className={Styles.releaseBySystem}>
        <div className={Styles.shiftContainer}>
          <div className={Styles.shiftWrapper}>
            <span className={Styles.shift}>Shift 1</span>
            <span className={Styles.amount}>{line2Shift1}</span>
          </div>
          <div className={Styles.shiftWrapper}>
            <span className={Styles.shift}>Shift 2</span>
            <span className={Styles.amount}>{line2Shift2 - line2Shift1}</span>
          </div>
          <div className={Styles.shiftWrapper}>
            <span className={Styles.shift}>Shift 3</span>
            <span className={Styles.amount}>{line2Total - line2Shift2}</span>
          </div>
        </div>
        <div className={Styles.totalReleaseBySystem}>
          <span className={Styles.shift}>Total Output by System</span>
          <span className={Styles.amount}>{line2Total}</span>
        </div>
      </div>
    );
  };
  const renderLine1 = () => {
    return (
      <div className={Styles.lineContainer}>
        {renderHeader("LINE 1")}
        {renderChart1()}
      </div>
    );
  };

  const renderLine2 = () => {
    return (
      <div className={Styles.lineContainer}>
        {renderHeader("LINE 2")}
        {renderChart2()}
      </div>
    );
  };
  return (
    <div className={Styles.container}>
      {adminProfile && adminProfile.machine1 && renderLine1()}
      {adminProfile && adminProfile.machine2 && renderLine2()}
    </div>
  );
}
