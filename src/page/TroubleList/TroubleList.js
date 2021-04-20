import React, { useEffect, useState } from "react";
import moment from "moment";
import classNames from "classnames";
import InputSelect from "../../components/InputSelect/InputSelect";
import InputDate from "../../components/InputDate/InputDate";
import TroubleTable from "./TroubleTable/TroubleTable";
import Styles from "./TroubleList.module.scss";

let totalMinutes = 1440;

export default function TroubleList() {
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState(moment().unix());
  const [minutesPass, setMinutesPass] = useState(0);

  useEffect(() => {
    const getDays = moment().format("YYYY MM DD");
    const curentTime = moment().format("YYYY MM DD HH:mm");
    const startDay = moment(`${getDays} 07:00`).format();
    const ms = Math.abs(new Date(curentTime) - new Date(startDay)) / 1000;
    setMinutesPass(ms / 60);
  }, []);

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

    return minutes;
  }

  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <span>Trouble List</span>
        <div className={Styles.filter}>
          <InputSelect
            value={selected}
            className={Styles.inputSelect}
            placeholder={"Line 1"}
            defaultValue={"Line 1"}
            options={[
              { value: "machine1", label: "Line 1" },
              { value: "machine2", label: "Line 2" },
            ]}
            onChange={selected => setSelected(selected.value)}
          />
          <InputDate value={date} onChange={e => setDate(e)} />
        </div>
      </div>
    );
  };

  const renderStatus = () => {
    return (
      <div className={Styles.statusContainer}>
        <div className={Styles.headerStatus}>
          <span>Production Status - LINE 1</span>
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
          {mockData.map((item, idx) => (
            <div
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
              flex: totalMinutes - minutesPass,
              backgroundColor: "white",
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
        <span>07:00</span>
        <span>08:00</span>
        <span>09:00</span>
        <span>10:00</span>
        <span>11:00</span>
        <span>12:00</span>
        <span>13:00</span>
        <span>14:00</span>
        <span>15:00</span>
        <span>16:00</span>
        <span>17:00</span>
        <span>18:00</span>
        <span>19:00</span>
        <span>20:00</span>
        <span>21:00</span>
        <span>22:00</span>
        <span>23:00</span>
        <span>24:00</span>
        <span>01:00</span>
        <span>02:00</span>
        <span>03:00</span>
        <span>04:00</span>
        <span>05:00</span>
        <span>06:00</span>
      </>
    );
  };

  const renderTable = () => {
    return (
      <TroubleTable
        data={mockData}
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

const mockData = [
  {
    id: "e88f0953-1143-4bab-914e-ac0ca8b9c746",
    machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
    categoryId: null,
    startTime: "2021-04-20T00:00:00.000Z",
    endTime: "2021-04-20T01:00:00.000Z",
    remark: null,
    status: "startup",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-20T05:53:11.965Z",
    updatedAt: "2021-04-20T07:01:44.403Z",
  },
  {
    id: "fb335e54-69a5-4b91-af87-1a16acd36541",
    machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
    categoryId: null,
    startTime: "2021-04-20T01:00:00.000Z",
    endTime: "2021-04-20T04:00:00.000Z",
    remark: null,
    status: "running",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-20T07:01:44.372Z",
    updatedAt: "2021-04-20T07:02:11.900Z",
  },
  {
    id: "2f06bbcb-2fa3-47af-8494-b748d3fd95ca",
    machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
    categoryId: null,
    startTime: "2021-04-20T04:00:00.000Z",
    endTime: null,
    remark: null,
    status: "off",
    createdBy: null,
    updatedBy: null,
    createdAt: "2021-04-20T07:02:11.878Z",
    updatedAt: "2021-04-20T07:02:27.176Z",
  },
];
