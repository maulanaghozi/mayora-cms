import React, { useState, useEffect } from "react";
import moment from "moment";
import GaugeChart from "../../../../components/GaugeChart/GaugeChart";
import Styles from "./OEE.module.scss";
import { http } from "../../../../utility/http";

export default function OEE() {
  const [oee1, setOee1] = useState({ OEE: 0, AV: 0, PE: 0, QR: 0 });
  const [oee2, setOee2] = useState({ OEE: 0, AV: 0, PE: 0, QR: 0 });
  const [target1, setTarget1] = useState(0);
  const [target2, setTarget2] = useState(0);
  const [date, setDate] = useState(
    moment().subtract(1, "days").format("DD MMM YYYY")
  );

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getOeeTarget1();
    getOeeTarget2();
    getOEE1();
    getOEE2();
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
      setTarget1(result.payload.target);
    } else {
      setTarget1(0);
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
      setTarget2(result.payload.target);
    } else {
      setTarget2(0);
    }
  };

  const getOEE1 = async () => {
    let today = moment().format("YYYY-MM-DD");
    let date = moment(today).subtract(1, "days").format("YYYY-MM-DD");
    let startDate7 = moment(`${today} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(startDate7) - new Date(curentTime)) / 1000;
    const msa = (new Date(startDate7) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      today = moment().subtract(1, "days").format("YYYY-MM-DD");
      date = moment(today).subtract(1, "days").format("YYYY-MM-DD");
    }

    const params = {
      method: "GET",
      path: `report-oee/00f5eafd-89c5-4871-a982-26a8180774c7/${date}`,
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        console.log(result.payload);
        setDate(moment(date).format("DD MMM YYYY"));
        setOee1(result.payload);
      } else {
        setOee1({ OEE: 0, AV: 0, PE: 0, QR: 0 });
      }
    } else {
      console.log("error ", result);
    }
  };

  const getOEE2 = async () => {
    let today = moment().format("YYYY-MM-DD");
    let date = moment(today).subtract(1, "days").format("YYYY-MM-DD");
    let startDate7 = moment(`${today} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(startDate7) - new Date(curentTime)) / 1000;
    const msa = (new Date(startDate7) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      today = moment().subtract(1, "days").format("YYYY-MM-DD");
      date = moment(today).subtract(1, "days").format("YYYY-MM-DD");
    }

    const params = {
      method: "GET",
      path: `report-oee/f59e7c5f-4774-48e9-a19e-00d578a21ee4/${date}`,
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (result.payload) {
        console.log(result.payload);
        setDate(moment(date).format("DD MMM YYYY"));
        setOee2(result.payload);
      } else {
        setOee2({ OEE: 0, AV: 0, PE: 0, QR: 0 });
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
        {/* <div className={Styles.dataWrapper}>
          <span>Target</span>
          <h1>{`${target}%`}</h1>
        </div> */}
        <div className={Styles.dataWrapper}>
          <span>Date</span>
          <h1>{date}</h1>
        </div>
      </div>
    );
  };
  const renderChart1 = () => {
    return (
      <div className={Styles.chartContainer}>
        <div className={Styles.chart}>
          <GaugeChart
            title={"OEE"}
            target={target1}
            value={oee1.OEE > 100 ? 100 : oee1.OEE < 0 ? 0 : oee1.OEE}
          />
        </div>
        <div className={Styles.chart}>
          <GaugeChart
            title={"AV"}
            target={90}
            value={oee1.AV > 100 ? 100 : oee1.AV < 0 ? 0 : oee1.AV}
          />
        </div>
        <div className={Styles.chart}>
          <GaugeChart
            title={"PE"}
            target={95}
            value={oee1.PE > 100 ? 100 : oee1.PE < 0 ? 0 : oee1.PE}
          />
        </div>
        <div className={Styles.chart}>
          <GaugeChart
            title={"QR"}
            target={99}
            value={oee1.QR > 100 ? 100 : oee1.QR < 0 ? 0 : oee1.QR}
          />
        </div>
      </div>
    );
  };

  //if value grater than 100, set value to 100
  //if value lt 0, set value to 0

  const renderChart2 = () => {
    return (
      <div className={Styles.chartContainer}>
        <div className={Styles.chart}>
          <GaugeChart
            title={"OEE"}
            target={target2}
            value={oee2.OEE > 100 ? 100 : oee2.OEE < 0 ? 0 : oee2.OEE}
          />
        </div>
        <div className={Styles.chart}>
          <GaugeChart
            title={"AV"}
            target={90}
            value={oee2.AV > 100 ? 100 : oee2.AV < 0 ? 0 : oee2.AV}
          />
        </div>
        <div className={Styles.chart}>
          <GaugeChart
            title={"PE"}
            target={95}
            value={oee2.PE > 100 ? 100 : oee2.PE < 0 ? 0 : oee2.PE}
          />
        </div>
        <div className={Styles.chart}>
          <GaugeChart
            title={"QR"}
            target={99}
            value={oee2.QR > 100 ? 100 : oee2.QR < 0 ? 0 : oee2.QR}
          />
        </div>
      </div>
    );
  };
  const renderLine1 = () => {
    return (
      <div className={Styles.lineContainer}>
        {renderHeader("LINE 1", target1)}
        {renderChart1()}
      </div>
    );
  };

  const renderLine2 = () => {
    return (
      <div className={Styles.lineContainer}>
        {renderHeader("LINE 2", target2)}
        {renderChart2()}
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
