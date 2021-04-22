import React, { useEffect, useState } from "react";
import moment from "moment";
import InputSelect from "../../components/InputSelect/InputSelect";
import InputDate from "../../components/InputDate/InputDate";
import PageTitle from "../../components/PageTitle/PageTitle";
import Styles from "./ManualCollection.module.scss";

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
        <div className={Styles.head}>
          <span>Manual Collection</span>
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
        <PageTitle
          title={[
            "Not Operating Day & Planned Down Time",
            "Down Time Losses",
            "Speed Losses",
            "Defect & Rework Losses (3)",
            "Release",
          ]}
          path={[
            "/manual-collection/planed-down-time",
            "/manual-collection/down-time-losses",
            "/manual-collection/speed-losses",
            "/manual-collection/rework-losses",
            "/manual-collection/release",
          ]}
        />
      </div>
    );
  };

  return <div>{renderHeader()}</div>;
}
