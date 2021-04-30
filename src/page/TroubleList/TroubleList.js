import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import classNames from "classnames";
import InputSelect from "../../components/Form/InputSelect/InputSelect";
import InputDate from "../../components/Form/InputDate/InputDate";
import TroubleTable from "./TroubleTable/TroubleTable";
import Styles from "./TroubleList.module.scss";
import usePolling from "../../hooks/usePolling/usePolling";
import { http } from "../../utility/http";
import { Context } from "../../hooks/context";
export const baseURL = process.env.REACT_APP_BASE_URL;

function getTime() {
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
}

export default function TroubleList(props) {
  const [dataStatus, setDataStatus] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [startTime, setStartTime] = useState(getTime().getThisDay07);
  const [endTime, setEndTime] = useState(getTime().endTime);
  const [minutesPass, setMinutesPass] = useState(0);
  const globalState = useContext(Context);
  const { machine, dateSelected, setMachine, setDateSelected } = globalState;

  useEffect(() => {
    handleMinutesPass();
  }, []);

  const handleMinutesPass = () => {
    let getDays = moment(dateSelected * 1000).format("YYYY MM DD");
    let curentTime = moment().format("YYYY MM DD HH:mm");
    let startDay = moment(`${getDays} 07:00`).format("YYYY MM DD HH:mm");
    let endDay = moment(startDay).add(1, "days").format("YYYY MM DD HH:mm");

    console.log({ getDays, curentTime, startDay, endDay });

    if (curentTime < startDay) {
      getDays = moment(getDays).subtract(1, "days").format("YYYY MM DD");
      startDay = moment(`${getDays} 07:00`).format("YYYY MM DD HH:mm");
      endDay = moment(startDay).add(1, "days").format("YYYY MM DD HH:mm");
    }

    setStartTime(startDay);
    setEndTime(endDay);

    const ms = Math.abs(new Date(curentTime) - new Date(startDay)) / 1000;
    setMinutesPass(ms / 60);
    return;
  };

  useEffect(() => {
    getTroublelist();
  }, [machine.machineId, startTime]);

  const getTroublelist = async () => {
    getStatus();
    getDataTable();
  };

  usePolling(getTroublelist, 120000);

  const getStatus = async () => {
    const params = {
      method: "GET",
      path: "trouble",
      query: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        machineId: machine.machineId,
      },
    };

    console.log("THIS IS PARAMS =>> ", params);

    const result = await http(params);

    if (result && result.code === "success") {
      setDataStatus(result.payload.results);
    } else {
      console.log(result);
      alert("please contact administrator");
    }
  };

  const getDataTable = async () => {
    const params = {
      method: "GET",
      path: "trouble",
      query: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: "downtime",
        machineId: machine.machineId,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      setDataTable(result.payload.results);
    } else {
      console.log(result);
      alert("please contact administrator");
    }
  };

  const onDownload = async () => {
    const params = {
      method: "GET",
      path: "trouble/download",
      query: {
        date: moment(dateSelected * 1000).format("YYYY-MM-DD"),
        status: "downtime",
        machineId: machine.machineId,
      },
    };

    console.log(params);

    const result = await http(params);

    // console.log(typeof result);
    return (
      <a
        target="_blank"
        href={`${baseURL}trouble/download?date=${moment(
          dateSelected * 1000
        ).format("YYYY-MM-DD")}&status=downtime&machineId=${machine.machineId}`}
      ></a>
    );

    // if (result && result.code === "success") {
    //   console.log("SUKSES DOWNLOAD");
    // } else {
    //   // console.log(result);
    //   alert("please contact administrator");
    // }
  };

  function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds =
      Math.abs(new Date(dateFuture) - new Date(dateNow)) / 1000;
    if (!dateFuture) {
      const curentTime = moment().format("YYYY MM DD HH:mm");
      diffInMilliSeconds =
        Math.abs(new Date(curentTime) - new Date(dateNow)) / 1000;
    }

    // calculate minutes
    const minutes = diffInMilliSeconds / 60;
    return Math.round(Number(minutes));
  }

  const onChangeDate = time => {
    let getDays = moment(time * 1000).format("YYYY MM DD");
    let startDay = moment(`${getDays} 07:00`).format("YYYY MM DD HH:mm");
    let endDay = moment(startDay).add(1, "days").format("YYYY MM DD HH:mm");

    setStartTime(startDay);
    setEndTime(endDay);
    setDateSelected(time);

    if (getDays === moment().format("YYYY MM DD")) {
      handleMinutesPass();
    } else {
      setMinutesPass(1440);
    }

    return;
  };

  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <span>Trouble List</span>
        <div className={Styles.filter}>
          {/* <span className={Styles.buttonExport} onClick={() => onDownload()}>
            Download
          </span> */}
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
          <InputDate value={dateSelected} onChange={e => onChangeDate(e)} />
        </div>
      </div>
    );
  };

  const renderStatus = () => {
    return (
      <div className={Styles.statusContainer}>
        <div className={Styles.headerStatus}>
          <span>{`Production Status - ${machine.machineName.toUpperCase()}`}</span>
          <div className={Styles.indicatorColor}>
            <div className={Styles.status}>
              <div className={classNames(Styles.box, Styles.grey)} />
              <span>Off</span>
            </div>
            <div className={Styles.status}>
              <div className={classNames(Styles.box, Styles.green)} />
              <span>Running</span>
            </div>
            <div className={Styles.status}>
              <div className={classNames(Styles.box, Styles.yellow)} />
              <span>Start Up</span>
            </div>
            <div className={Styles.status}>
              <div className={classNames(Styles.box, Styles.red)} />
              <span>Down Time</span>
            </div>
          </div>
        </div>
        {renderProgress()}
      </div>
    );
  };

  const backgroundProgress = status => {
    switch (status) {
      case "off":
        return "#9e9e9e";
      case "startup":
        return "#FABB43";
      case "running":
        return "#0AC46B";
      case "downtime":
        return "#E92548";
      case "disconnected":
        return "#000000";
      default:
        return "#ffffff";
    }
  };

  const renderProgress = () => {
    return (
      <div className={Styles.progressContainer}>
        <div className={classNames(Styles.bar)}>
          {dataStatus.map((item, idx) => (
            <div
              key={idx.toString()}
              style={{
                height: "20px",
                flex: timeDiffCalc(item.endTime, item.startTime),
                backgroundColor: backgroundProgress(item.status),
              }}
            ></div>
          ))}
          <div
            style={{
              height: "20px",
              flex: getTime().totalMinutes - minutesPass,
              backgroundColor: "#ffffff",
            }}
          ></div>
        </div>
        <div className={Styles.hours}>{renderHours()}</div>
      </div>
    );
  };

  const renderHours = () => {
    return (
      <>
        <span>07</span>
        <span>08</span>
        <span>09</span>
        <span>10</span>
        <span>11</span>
        <span>12</span>
        <span>13</span>
        <span>14</span>
        <span>15</span>
        <span>16</span>
        <span>17</span>
        <span>18</span>
        <span>19</span>
        <span>20</span>
        <span>21</span>
        <span>22</span>
        <span>23</span>
        <span>24</span>
        <span>01</span>
        <span>02</span>
        <span>03</span>
        <span>04</span>
        <span>05</span>
        <span>06</span>
      </>
    );
  };

  const renderTable = () => {
    return (
      <TroubleTable
        data={dataTable}
        onChange={() => {}}
        sort={"time"}
        setKey={() => {}}
      />
    );
  };

  return (
    <div>
      {renderHeader()}
      {renderStatus()}
      {renderTable()}
    </div>
  );
}
