import React, { useEffect, useState } from "react";
import moment from "moment";
import InputSelect from "../../components/Form/InputSelect/InputSelect";
import { DownloadIcon } from "../../assets/icons";
import Styles from "./Report.module.scss";

export default function Report() {
  const [machineId, setMachineId] = useState(
    "00f5eafd-89c5-4871-a982-26a8180774c7"
  );
  const [duration, setDuration] = useState("weekly");
  const [week, setWeek] = useState("01 (2021)");

  useEffect(() => {
    const getDays = moment().format("YYYY MM DD");
    console.log(moment(`${getDays} 07:00`).format());
  }, []);

  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <span>Report</span>
      </div>
    );
  };

  const renderExportReport = () => {
    return (
      <div className={Styles.exportReport}>
        <span className={Styles.title}>Export Report</span>
        <span className={Styles.note}>
          Pilih Line type, Report duration dan Week sebelum export data
        </span>
        <div className={Styles.filterContainer}>
          <div className={Styles.filter}>
            <span>Line Type</span>
            <InputSelect
              value={machineId}
              className={Styles.inputSelect}
              placeholder={"Line 1"}
              defaultValue={"Line 1"}
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
              onChange={selected => setMachineId(selected.value)}
            />
          </div>
          <div className={Styles.filter}>
            <span>Report Duration</span>
            <InputSelect
              value={duration}
              className={Styles.inputSelect}
              placeholder={"weekly"}
              defaultValue={"weekly"}
              options={[
                {
                  value: "weekly",
                  label: "weekly",
                },
                {
                  value: "monthly",
                  label: "monthly",
                },
                {
                  value: "semester",
                  label: "semester",
                },
              ]}
              onChange={selected => setDuration(selected.value)}
            />
          </div>
          <div className={Styles.filter}>
            <span>Week</span>
            <InputSelect
              value={week}
              className={Styles.inputSelect}
              placeholder={"01 (2021)"}
              defaultValue={"01 (2021)"}
              options={[
                {
                  value: "01 (2021)",
                  label: "01 (2021)",
                },
                {
                  value: "02 (2021)",
                  label: "02 (2021)",
                },
                {
                  value: "03 (2021)",
                  label: "03 (2021)",
                },
              ]}
              onChange={selected => setWeek(selected.value)}
            />
          </div>
          <div className={Styles.download}>
            <DownloadIcon />
            <span>Export</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderHeader()}
      {renderExportReport()}
    </div>
  );
}
