import React, { useEffect, useState } from "react";
import moment from "moment";
import InputSelect from "../../components/InputSelect/InputSelect";
import InputDate from "../../components/InputDate/InputDate";
import TableShiftRelease from "../../components/TableShiftRelease/TableShiftRelease";
import Styles from "./Release.module.scss";

export default function TroubleList() {
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState(moment().unix());

  useEffect(() => {
    const getDays = moment().format("YYYY MM DD");
    console.log(moment(`${getDays} 07:00`).format());
  }, []);

  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <span>Release</span>
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

  const renderTotalRelease = () => {
    return (
      <div className={Styles.akumulasiRelease}>
        <span>Data Release By System</span>
        <span className={Styles.akumulasi}>Total Release: 300</span>
      </div>
    );
  };

  const renderTableRelease = () => {
    return (
      <div className={Styles.tableWraper}>
        <TableShiftRelease
          title={"Shift 1"}
          styleContainer={Styles.table}
          data={[
            { time: "07:00", amount: 100 },
            { time: "08:00", amount: 110 },
            { time: "09:00", amount: 120 },
            { time: "10:00", amount: 130 },
            { time: "11:00", amount: 140 },
            { time: "12:00", amount: 150 },
            { time: "13:00", amount: 160 },
            { time: "14:00", amount: 170 },
          ]}
        />
        <TableShiftRelease
          title={"Shift 2"}
          styleContainer={Styles.table}
          data={[
            { time: "15:00", amount: 180 },
            { time: "16:00", amount: 190 },
            { time: "17:00", amount: 200 },
            { time: "18:00", amount: 210 },
            { time: "19:00", amount: 220 },
            { time: "20:00", amount: 230 },
            { time: "21:00", amount: 240 },
            { time: "22:00", amount: 250 },
          ]}
        />
        <TableShiftRelease
          title={"Shift 3"}
          styleContainer={Styles.table}
          data={[
            { time: "23:00", amount: 260 },
            { time: "24:00", amount: 270 },
            { time: "01:00", amount: 280 },
            { time: "02:00", amount: 290 },
            { time: "03:00", amount: 300 },
            { time: "04:00", amount: 310 },
            { time: "05:00", amount: 320 },
            { time: "06:00", amount: 330 },
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
