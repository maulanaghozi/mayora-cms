import React, { useEffect, useState } from "react";
import moment from "moment";
import InputSelect from "../../components/Form/InputSelect/InputSelect";
import { DownloadIcon } from "../../assets/icons";
import Styles from "./Report.module.scss";
import InputDate from "../../components/Form/InputDate/InputDate";
import { http } from "../../utility/http";

export default function Report() {
  const [machineId, setMachineId] = useState(
    "00f5eafd-89c5-4871-a982-26a8180774c7"
  );
  const [duration, setDuration] = useState("weekly");
  const [week, setWeek] = useState("01 (2021)");
  const [date, setDate] = useState(moment().unix());

  useEffect(() => {
    const getDays = moment().format("YYYY MM DD");
    console.log(moment(`${getDays} 07:00`).format());
  }, []);

  const onExport = async () => {
    const params = {
      method: "GET",
      path: "http://localhost:3000/report-daily",
      query: {
        date: moment(date * 1000).format("YYYY-MM-DD"),
        machineId: machineId,
      },
      content_type: 'application/octet-stream',
      responseType:'blob'
    };

    console.log(params);
    console.log(moment(date * 1000).format("YYYY-MM-DD"));

    const result = await http(params);

    // 2. Create blob link to download
    const url = window.URL.createObjectURL(result);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Report Weekly`);
    // 3. Append to html page
    document.body.appendChild(link);
    // 4. Force download
    link.click();
    // 5. Clean up and remove the link
    link.parentNode.removeChild(link);

    return result;
    // if (result && result.code === "success") {
    //   console.log("SUKSES EXPORT");
    // } else {
    //   // console.log(result);
    //   alert("please contact administrator");
    // }
  };

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
            <InputDate 
              value={date} 
              onChange={e => setDate(e)}
              className={Styles.inputSelect} />
          </div>
          <div className={Styles.download}  onClick={() => onExport()}>
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
