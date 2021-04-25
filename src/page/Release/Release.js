import React, { useEffect, useState } from "react";
import moment from "moment";
import InputSelect from "../../components/Form/InputSelect/InputSelect";
import InputDate from "../../components/Form/InputDate/InputDate";
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
        <span className={Styles.akumulasi}>Total Release: 0</span>
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
