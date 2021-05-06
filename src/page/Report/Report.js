import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import InputSelect from "../../components/Form/InputSelect/InputSelect";
import InputText from "../../components/Form/InputText/InputText";
import { DownloadIcon, ExcelFileIcon } from "../../assets/icons";
import Styles from "./Report.module.scss";
import InputDate from "../../components/Form/InputDate/InputDate";
import { http } from "../../utility/http";

export default function Report() {
  const inputFile1 = useRef(null);
  const inputFile2 = useRef(null);
  const inputFile3 = useRef(null);

  const [machineId, setMachineId] = useState(
    "00f5eafd-89c5-4871-a982-26a8180774c7"
  );
  const [report, setReport] = useState("weekly");
  const [duration, setDuration] = useState("7 Day");
  const [week, setWeek] = useState("4 Week");
  const [date, setDate] = useState(moment().unix());
  const [file1, setFile1] = useState("not set");
  const [file2, setFile2] = useState("not set");
  const [file3, setFile3] = useState("not set");
  const [isMonthly, setIsMonthly] = useState(false);

  useEffect(() => {
    const getDays = moment().format("YYYY MM DD");
    getTemplate();
    console.log(moment(`${getDays} 07:00`).format());
  }, []);

  const onExport = async () => {
    const params = {
      method: "GET",
      path: `report-${report}`,
      query: {
        date: moment(date * 1000).format("YYYY-MM-DD"),
        machineId: machineId,
        duration: week | 4,
      },
      content_type: "application/octet-stream",
      responseType: "blob",
    };

    const result = await http(params);

    if (!result) {
      alert("please contact administrator");
    } else {
      const url = window.URL.createObjectURL(result);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Report ${report} ${moment(date * 1000).format("YYYY-MM-DD hh-mm-ss")}`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      return result;
    }
  };

  function mapTemplate(data) {
    if (data) {
      if (data.type == "weekly") {
        setFile1(data.fileTemplate);
      } else if (data.type == "monthly") {
        setFile2(data.fileTemplate);
      } else if (data.type == "semester") {
        setFile3(data.fileTemplate);
      }

      return data.fileTemplate;
    }

    return null;
  }

  const getTemplate = async () => {
    const params = {
      method: "GET",
      path: "template",
    };

    console.log(params);

    const result = await http(params);

    console.log(result);
    if (result && result.code === "success") {
      if (result.payload) {
        result.payload.map(e => mapTemplate(e));
      } else {
        setFile1("not set");
        setFile2("not set");
        setFile3("not set");
      }
    } else {
      alert("please contact administrator");
    }
  };

  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <span>Report</span>
      </div>
    );
  };

  const onWeekChange = e => {
    setWeek(e);
  };

  const onReportChange = e => {
    setReport(e);

    if (e == "weekly") {
      setDuration("7 Day");
      setIsMonthly(false);
    } else if (e == "monthly") {
      setDuration("");
      setIsMonthly(true);
    } else if (e == "semester") {
      setDuration("6 Month");
      setIsMonthly(false);
    }

    setWeek("4");
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
            <span>Report</span>
            <InputSelect
              value={report}
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
              onChange={selected => onReportChange(selected.value)}
            />
          </div>
          <div className={Styles.filter}>
            <span>Start</span>
            <InputDate
              value={date}
              onChange={e => setDate(e)}
              className={Styles.inputDate}
            />
          </div>

          <div
            className={Styles.filter}
            style={{ display: isMonthly ? "block" : "none" }}
          >
            <span>Duration</span>
            <InputSelect
              value={week}
              className={Styles.inputSelect}
              placeholder={"4 Week"}
              defaultValue={"4"}
              options={[
                {
                  value: "4",
                  label: "4 Week",
                },
                {
                  value: "5",
                  label: "5 Week",
                },
              ]}
              onChange={selected => onWeekChange(selected.value)}
            />
          </div>
          <div
            className={Styles.filter}
            style={{ display: !isMonthly ? "block" : "none" }}
          >
            <span>Duration</span>
            <InputText
              value={duration}
              className={Styles.inputText}
              placeholder={"7 Day"}
              defaultValue={"7"}
              disabled={true}
            />
          </div>

          <div className={Styles.download} onClick={() => onExport()}>
            <DownloadIcon />
            <span>Export</span>
          </div>
        </div>
      </div>
    );
  };

  const renderHorizontalLine = () => {
    return <hr className={Styles.hr}></hr>;
  };

  const RenderDurationMonthly = () => (
    <div className={Styles.filter}>
      <span>Duration</span>
      <InputSelect
        value={week}
        className={Styles.inputSelect}
        placeholder={"4 Week"}
        defaultValue={"4"}
        options={[
          {
            value: "4",
            label: "4 Week",
          },
          {
            value: "5",
            label: "5 Week",
          },
        ]}
        onChange={selected => onWeekChange(selected.value)}
      />
    </div>
  );

  const RenderDuration = () => (
    <div className={Styles.filter}>
      <span>Duration</span>
      <InputText
        value={duration}
        className={Styles.inputText}
        placeholder={"7 Day"}
        defaultValue={"7"}
        disabled={true}
      />
    </div>
  );

  const renderTemplate = () => {
    return (
      <div className={Styles.exportReport}>
        <span className={Styles.title}>Import Template</span>
        <span className={Styles.note}>
          Pilih file excel yang akan di-import dan dijadikan template untuk
          Report
        </span>

        <div className={Styles.filterContainer}>{renderexcelTemplate()}</div>
      </div>
    );
  };

  const renderexcelTemplate = () => {
    return (
      <div className={Styles.box}>
        <span>Current excel template</span>
        <div className={Styles.insideBox}>
          <div className={Styles.miniBox}>
            <ExcelFileIcon />
          </div>
          <span className={Styles.periode}>(Weekly)</span>
          <span className={Styles.fileName}>{file1}</span>
          <div className={Styles.buttonTamplate} onClick={onButtonClick1}>
            <span>Replace</span>
          </div>
          <div
            className={Styles.download}
            onClick={() => onDownload("weekly", file1)}
          >
            <span>Download</span>
          </div>
        </div>

        <div className={Styles.insideBox}>
          <div className={Styles.miniBox}>
            <ExcelFileIcon />
          </div>
          <span className={Styles.periode}>(Monthly)</span>
          <span className={Styles.fileName}>{file2}</span>
          <div className={Styles.buttonTamplate} onClick={onButtonClick2}>
            <span>Replace</span>
          </div>
          <div
            className={Styles.download}
            onClick={() => onDownload("monthly", file2)}
          >
            <span>Download</span>
          </div>
        </div>

        <div className={Styles.insideBox}>
          <div className={Styles.miniBox}>
            <ExcelFileIcon />
          </div>
          <span className={Styles.periode}>(Semester)</span>
          <span className={Styles.fileName}>{file3}</span>
          <div className={Styles.buttonTamplate} onClick={onButtonClick3}>
            <span>Replace</span>
          </div>
          <div
            className={Styles.download}
            onClick={() => onDownload("semester", file3)}
          >
            <span>Download</span>
          </div>
        </div>
      </div>
    );
  };

  const onButtonClick1 = () => {
    // `current` points to the mounted file input element
    inputFile1.current.click();
  };

  const onButtonClick2 = () => {
    // `current` points to the mounted file input element
    inputFile2.current.click();
  };

  const onButtonClick3 = () => {
    // `current` points to the mounted file input element
    inputFile3.current.click();
  };

  const fileChange = (e, periode) => {
    if (periode == "weekly") {
      setFile1("Uploading...");
    } else if (periode == "monthly") {
      setFile2("Uploading...");
    } else if (periode == "semester") {
      setFile3("Uploading...");
    }

    onUpload(e.target.files[0], periode);
  };

  const fileClick = e => {
    e.target.value = null;
  };

  const onUpload = async (file, periode) => {
    var formData = new FormData();
    formData.append("file", file);

    const params = {
      method: "POST",
      path: `report-${periode}/upload`,
      content_type: "multipart/form-data",
      data: formData,
    };

    console.log(formData);

    const result = await http(params);
    if (result && result.code === "success") {
      if (result.payload) {
        if (periode == "weekly") {
          setFile1(result.payload);
        } else if (periode == "monthly") {
          setFile2(result.payload);
        } else if (periode == "semester") {
          setFile3(result.payload);
        }
      }

      console.log("SUKSES UPLOAD");
    } else {
      // console.log(result);
      alert("please contact administrator");
    }
  };

  const onDownload = async (periode, fileName) => {
    const params = {
      method: "GET",
      path: `report-${periode}/download`,
      content_type: "application/octet-stream",
      responseType: "blob",
    };

    const result = await http(params);

    console.log(params);

    if (!result) return;

    // 2. Create blob link to download
    const url = window.URL.createObjectURL(result);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName ?? `Template report ${periode}`);
    // 3. Append to html page
    document.body.appendChild(link);
    // 4. Force download
    link.click();
    // 5. Clean up and remove the link
    link.parentNode.removeChild(link);

    if (result && result.code === "err_general") {
      // console.log(result);
      alert("please contact administrator");
    }
  };

  return (
    <div>
      <input
        type="file"
        id="weekly"
        ref={inputFile1}
        style={{ display: "none" }}
        onChange={e => fileChange(e, "weekly")}
        onClick={e => fileClick(e)}
      />
      <input
        type="file"
        id="monthly"
        ref={inputFile2}
        style={{ display: "none" }}
        onChange={e => fileChange(e, "monthly")}
        onClick={e => fileClick(e)}
      />
      <input
        type="file"
        id="semester"
        ref={inputFile3}
        style={{ display: "none" }}
        onChange={e => fileChange(e, "semester")}
        onClick={e => fileClick(e)}
      />
      {renderHeader()}
      {renderExportReport()}
      {renderHorizontalLine()}
      {renderTemplate()}
    </div>
  );
}
