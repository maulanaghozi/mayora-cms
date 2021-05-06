import React, { useState, useEffect } from "react";
import { http } from "../../../../utility/http";
import TableOEE from "../../../../components/TableOEE/TableOEE";
import Styles from "./OEEvsTarget.module.scss";
import moment from "moment";

export default function OEEvsTarget() {
  const [targetOEE1, setTargetOEE1] = useState(0);
  const [targetOEE2, setTargetOEE2] = useState(0);
  const [oeeData1, setOeeData1] = useState([]);
  const [oeeData2, setOeeData2] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getOEE1();
    getOEE2();
    getOeeTarget1();
    getOeeTarget2();
  };

  const getOeeTarget1 = async () => {
    const params = {
      method: "GET",
      path: "oee-target/target",
      query: {
        machineId: "00f5eafd-89c5-4871-a982-26a8180774c7",
      },
    };

    const result = await http(params);
    if (result && result.code === "success") {
      setTargetOEE1(result.payload.target);
    } else {
      setTargetOEE1(0);
    }
  };

  const getOeeTarget2 = async () => {
    const params = {
      method: "GET",
      path: "oee-target/target",
      query: {
        machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
      },
    };

    const result = await http(params);
    if (result && result.code === "success") {
      setTargetOEE2(result.payload.target);
    } else {
      setTargetOEE2(0);
    }
  };

  const getOEE1 = async () => {
    let date = moment().format("YYYY-MM-DD");
    let startDate7 = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");
    let endDate = moment(date).subtract(1, "days").format("YYYY-MM-DD");
    let startDate = moment(endDate).subtract(6, "days").format("YYYY-MM-DD");

    const ms = Math.abs(new Date(startDate7) - new Date(curentTime)) / 1000;
    const msa = (new Date(startDate7) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      date = moment(date).subtract(1, "days").format("YYYY MM DD");
      endDate = moment(date).subtract(1, "days").format("YYYY-MM-DD");
      startDate = moment(endDate).subtract(6, "days").format("YYYY-MM-DD");
    }

    const params = {
      method: "GET",
      path: "report-oee",
      query: {
        machineId: "00f5eafd-89c5-4871-a982-26a8180774c7",
        startDate: startDate,
        endDate: endDate,
      },
    };
    console.log(params);

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        console.log("payload 1111 ==>. ", result.payload);
        setOeeData1(result.payload.results);
      } else {
        setOeeData1([]);
      }
    } else {
      console.log("error ", result);
    }
  };

  const getOEE2 = async () => {
    let date = moment().format("YYYY-MM-DD");
    let startDate7 = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");
    let endDate = moment(date).subtract(1, "days").format("YYYY-MM-DD");
    let startDate = moment(endDate).subtract(6, "days").format("YYYY-MM-DD");

    const ms = Math.abs(new Date(startDate7) - new Date(curentTime)) / 1000;
    const msa = (new Date(startDate7) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      date = moment(date).subtract(1, "days").format("YYYY MM DD");
      endDate = moment(date).subtract(1, "days").format("YYYY-MM-DD");
      startDate = moment(endDate).subtract(6, "days").format("YYYY-MM-DD");
    }

    const params = {
      method: "GET",
      path: "report-oee",
      query: {
        machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
        startDate: startDate,
        endDate: endDate,
      },
    };

    console.log(params);

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        console.log("payload 2222 ==>. ", result.payload);
        setOeeData2(result.payload.results);
      } else {
        setOeeData2([]);
      }
    } else {
      console.log("error ", result);
    }
  };

  const renderTable1 = () => {
    return (
      <div className={Styles.tableContainer}>
        <div className={Styles.header}>
          <span>Line 1</span>
        </div>
        <div className={Styles.table}>
          <TableOEE data={oeeData1} target={targetOEE1} />
        </div>
      </div>
    );
  };

  const renderTable2 = () => {
    return (
      <div className={Styles.tableContainer}>
        <div className={Styles.header}>
          <span>Line 2</span>
        </div>
        <div className={Styles.table}>
          <TableOEE data={oeeData2} target={targetOEE2} />
        </div>
      </div>
    );
  };

  const renderLine1 = () => {
    return (
      <div className={Styles.lineContainer}>
        {renderTable1()}
        <div className={Styles.chart}></div>
      </div>
    );
  };

  const renderLine2 = () => {
    return (
      <div className={Styles.lineContainer}>
        {renderTable2()} <div className={Styles.chart}></div>
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
