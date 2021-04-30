import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import InputSelect from "../../components/Form/InputSelect/InputSelect";
import InputDate from "../../components/Form/InputDate/InputDate";
import TableShiftRelease from "../../components/TableShiftRelease/TableShiftRelease";
import { Context } from "../../hooks/context";
import Styles from "./Release.module.scss";
import { http } from "../../utility/http";

export default function TroubleList() {
  const [shift1, setShift1] = useState(0);
  const [shift2, setShift2] = useState(0);
  const [shift3, setShift3] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState([]);
  const globalState = useContext(Context);

  const { dateSelected, setDateSelected, machine, setMachine } = globalState;

  useEffect(() => {
    const getDays = moment().format("YYYY MM DD");
    console.log(moment(`${getDays} 07:00`).format());
  }, []);

  useEffect(() => {
    getTotalAmount();
    getTotal();
    getShift1();
    getShift2();
    getShift3();
  }, [dateSelected, machine.machineId]);

  const getTotalAmount = async () => {
    let date = moment(dateSelected * 1000).format("YYYY-MM-DD");
    let startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(curentTime) - new Date(startTime)) / 1000;

    if (ms < 86400) {
      date = moment(date).subtract(1, "days").format("YYYY-MM-DD");
    }

    const params = {
      method: "GET",
      path: "release/total",
      query: {
        machineId: machine.machineId,
        date: date,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (Array.isArray(result.payload)) {
        console.log("success ", result.payload);
        setTotalAmount(result.payload);
      } else {
        setTotalAmount([]);
      }
    } else {
      console.log("error ", result);
    }
  };

  const getTotal = async () => {
    let date = moment(dateSelected * 1000).format("YYYY MM DD");
    let startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let endTime = moment(startTime).add(1, "days").format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(curentTime) - new Date(startTime)) / 1000;

    if (ms < 86400) {
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

    const ms = Math.abs(new Date(curentTime) - new Date(startTime)) / 1000;

    if (ms < 86400) {
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
    let startTime = moment(`${date} 15:00`).format("YYYY MM DD HH:mm");
    let endTime = moment(`${date} 23:00`).format("YYYY MM DD HH:mm");
    let startDate = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(curentTime) - new Date(startDate)) / 1000;

    if (ms < 86400) {
      date = moment(date).subtract(1, "days").format("YYYY MM DD");
      startTime = moment(`${date} 15:00`).format("YYYY MM DD HH:mm");
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

    const ms = Math.abs(new Date(curentTime) - new Date(startDate)) / 1000;

    if (ms < 86400) {
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

  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <span>Release</span>
        <div className={Styles.filter}>
          <InputSelect
            value={machine.machineId}
            className={Styles.inputSelect}
            placeholder={machine.machineName}
            options={[
              {
                value: "00f5eafd-89c5-4871-a982-26a8180774c7",
                label: "Line 1",
              },
              {
                value: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
                label: "Line 2",
              },
            ]}
            onChange={selected => {
              setMachine({
                machineId: selected.value,
                machineName: selected.label,
              });
            }}
          />
          <InputDate value={dateSelected} onChange={e => setDateSelected(e)} />
        </div>
      </div>
    );
  };

  const renderTotalRelease = () => {
    return (
      <div className={Styles.akumulasiRelease}>
        <span>Data Release By System</span>
        <span className={Styles.akumulasi}>{`Total Release: ${total}`}</span>
      </div>
    );
  };

  const renderTableRelease = () => {
    return (
      <div className={Styles.tableWraper}>
        <TableShiftRelease
          total={shift1}
          title={"Shift 1"}
          styleContainer={Styles.table}
          data={[
            { time: "07:00", amount: null },
            { time: "08:00", amount: null },
            { time: "09:00", amount: null },
            { time: "10:00", amount: null },
            { time: "11:00", amount: null },
            { time: "12:00", amount: null },
            { time: "13:00", amount: null },
            { time: "14:00", amount: null },
          ]}
        />
        <TableShiftRelease
          total={shift2}
          title={"Shift 2"}
          styleContainer={Styles.table}
          data={[
            { time: "15:00", amount: null },
            { time: "16:00", amount: null },
            { time: "17:00", amount: null },
            { time: "18:00", amount: null },
            { time: "19:00", amount: null },
            { time: "20:00", amount: null },
            { time: "21:00", amount: null },
            { time: "22:00", amount: null },
          ]}
        />
        <TableShiftRelease
          total={shift3}
          title={"Shift 3"}
          styleContainer={Styles.table}
          data={[
            { time: "23:00", amount: null },
            { time: "24:00", amount: null },
            { time: "01:00", amount: null },
            { time: "02:00", amount: null },
            { time: "03:00", amount: null },
            { time: "04:00", amount: null },
            { time: "05:00", amount: null },
            { time: "06:00", amount: null },
          ]}
        />
      </div>
    );
  };

  return (
    <div className={Styles.container}>
      {renderHeader()}
      {renderTotalRelease()}
      {renderTableRelease()}
    </div>
  );
}
