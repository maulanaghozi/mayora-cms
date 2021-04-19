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

  useEffect(() => {
    const getDays = moment().format("YYYY MM DD");
    const startDay = moment(`${getDays} 02:00`).format();
    console.log(moment(startDay).startOf("minute").fromNow());
  }, []);

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

  const renderProgress = () => {
    return (
      <div className={Styles.progressContainer}>
        <div className={classNames(Styles.bar)}>
          <div
            style={{
              height: "20px",
              flex: 40,
              backgroundColor: "#9e9e9e",
            }}
          ></div>
          <div
            style={{
              height: "20px",
              flex: totalMinutes - 40,
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
  //   {
  //     troubleId: "trouble1",
  //     startTime: "09:00",
  //     endTime: "09:20",
  //     duration: "20 Min",
  //     category: "Trouble pompa inload glucose",
  //     remark: null,
  //     name: "system",
  //     updatedAt: "11 Mar 2021 09:20",
  //   },
  //   {
  //     troubleId: "trouble2",
  //     startTime: "15:15",
  //     endTime: "15:25",
  //     duration: "10 Min",
  //     category: "Double filter bocor",
  //     remark: null,
  //     name: "system",
  //     updatedAt: "11 Mar 2021 15:25",
  //   },
  //   {
  //     troubleId: "triuyble3",
  //     startTime: "18:07",
  //     endTime: "18:14",
  //     duration: "7 Min",
  //     category: "Trouble Kompresor/Angin",
  //     remark: null,
  //     name: "Andi Hidayat",
  //     updatedAt: "11 Mar 2021 18:14",
  //   },
];
