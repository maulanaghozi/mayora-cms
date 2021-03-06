import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import InputSelect from "../../components/Form/InputSelect/InputSelect";
import InputDate from "../../components/Form/InputDate/InputDate";
import TableShiftRelease from "../../components/TableShiftRelease/TableShiftRelease";
import { Context } from "../../hooks/context";
import Styles from "./Release.module.scss";
import { http } from "../../utility/http";
import { currencyFormater } from "../../utility/utility";

export default function Release() {
  const [shift1, setShift1] = useState(0);
  const [shift2, setShift2] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState([]);
  const globalState = useContext(Context);

  const { dateSelected, setDateSelected, machine, setMachine, adminProfile } =
    globalState;

  useEffect(() => {
    getTotalAmount();
    getTotal();
    getShift1();
    getShift2();
  }, [dateSelected, machine.machineId]);

  const handleAmoutDaily = time => {
    const result = totalAmount.find(item => item.time === time);

    return result ? result.amount : null;
  };

  const getTotalAmount = async () => {
    let date = moment(dateSelected * 1000).format("YYYY-MM-DD");
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
        machineId: machine.machineId,
        date: date,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      if (Array.isArray(result.payload)) {
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

  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <span>Output</span>
        <div className={Styles.filter}>
          <InputSelect
            value={machine.machineId}
            className={Styles.inputSelect}
            placeholder={machine.machineName}
            options={
              adminProfile && adminProfile.machine1 && adminProfile.machine2
                ? [
                    {
                      value: "00f5eafd-89c5-4871-a982-26a8180774c7",
                      label: "Line 1",
                    },
                    {
                      value: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
                      label: "Line 2",
                    },
                  ]
                : adminProfile && adminProfile.machine1
                ? [
                    {
                      value: "00f5eafd-89c5-4871-a982-26a8180774c7",
                      label: "Line 1",
                    },
                  ]
                : [
                    {
                      value: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
                      label: "Line 2",
                    },
                  ]
            }
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
        <span>Data Output By System</span>
        <span className={Styles.akumulasi}>{`Total Output: ${currencyFormater(
          total
        )}`}</span>
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
            { time: "07:00", amount: handleAmoutDaily(7) },
            { time: "08:00", amount: handleAmoutDaily(8) },
            { time: "09:00", amount: handleAmoutDaily(9) },
            { time: "10:00", amount: handleAmoutDaily(10) },
            { time: "11:00", amount: handleAmoutDaily(11) },
            { time: "12:00", amount: handleAmoutDaily(12) },
            { time: "13:00", amount: handleAmoutDaily(13) },
            { time: "14:00", amount: handleAmoutDaily(14) },
          ]}
        />
        <TableShiftRelease
          total={shift2 - shift1}
          title={"Shift 2"}
          styleContainer={Styles.table}
          data={[
            { time: "15:00", amount: handleAmoutDaily(15) },
            { time: "16:00", amount: handleAmoutDaily(16) },
            { time: "17:00", amount: handleAmoutDaily(17) },
            { time: "18:00", amount: handleAmoutDaily(18) },
            { time: "19:00", amount: handleAmoutDaily(19) },
            { time: "20:00", amount: handleAmoutDaily(20) },
            { time: "21:00", amount: handleAmoutDaily(21) },
            { time: "22:00", amount: handleAmoutDaily(22) },
          ]}
        />
        <TableShiftRelease
          total={total - shift2}
          title={"Shift 3"}
          styleContainer={Styles.table}
          data={[
            { time: "23:00", amount: handleAmoutDaily(23) },
            { time: "00:00", amount: handleAmoutDaily(0) },
            { time: "01:00", amount: handleAmoutDaily(1) },
            { time: "02:00", amount: handleAmoutDaily(2) },
            { time: "03:00", amount: handleAmoutDaily(3) },
            { time: "04:00", amount: handleAmoutDaily(4) },
            { time: "05:00", amount: handleAmoutDaily(5) },
            { time: "06:00", amount: handleAmoutDaily(6) },
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
