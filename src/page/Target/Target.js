import React, { useEffect, useState } from "react";
import moment from "moment";
import InputSelect from "../../components/InputSelect/InputSelect";
import PageTitle from "../../components/PageTitle/PageTitle";
import InputDate from "../../components/InputDate/InputDate";
import Styles from "./Target.module.scss";

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
          <span>Target</span>
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
          title={["Production Target", "Target OEE"]}
          path={["/target/production-target", "/target/target-oee"]}
        />
      </div>
    );
  };

  return <div>{renderHeader()}</div>;
}
