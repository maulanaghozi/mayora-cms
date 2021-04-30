import React, { useEffect, useState , useRef} from "react";
import moment from "moment";
import InputSelect from "../../components/Form/InputSelect/InputSelect";
import { DownloadIcon,ExcelFileIcon } from "../../assets/icons";
import Styles from "./Report.module.scss";
import InputDate from "../../components/Form/InputDate/InputDate";
import { http } from "../../utility/http";

export default function Report() {
  const inputFile = useRef(null) 

  const [machineId, setMachineId] = useState(
    "00f5eafd-89c5-4871-a982-26a8180774c7"
  );
  const [duration, setDuration] = useState("weekly");
  const [week, setWeek] = useState("01 (2021)");
  const [date, setDate] = useState(moment().unix());
  const [file1, setFile1] = useState('not set');
  const [file2, setFile2] = useState('not set');
  const [file3, setFile3] = useState('not set');
  

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
  
  const getTemplate = async () => {
    const params = {
      method: "GET",
      path: "http://localhost:3000/report",
    };

    console.log(params);
    
    const result = await http(params);
	
	console.log(result);
    if (result && result.code === "success") {
      console.log("sukses export");
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
              className={Styles.inputDate} />
          </div>
          <div className={Styles.download}  onClick={() => onExport()}>
            <DownloadIcon />
            <span>Export</span>
          </div>
        </div>
      </div>
    );
  };

  const renderHorizontalLine=()=>{
    return(
      <hr className={Styles.hr}></hr>
    )
  }

  const renderTemplate = () =>{
    return(
        <div className={Styles.exportReport}>
          <span className={Styles.title}>Import Template</span>
          <span className={Styles.note}>
            Pilih file excel yang akan di-import dan dijadikan template untuk Report
          </span>
          
          <div className={Styles.filterContainer}>
          {renderexcelTemplate()}
          </div>
        </div>
    )
  }

  const renderexcelTemplate = () =>{
    return(
      <div className={Styles.box}>
        <span>Current excel template</span>
        <div className={Styles.insideBox}>
          <div className={Styles.miniBox}>
            <ExcelFileIcon />
          </div>
          <span className={Styles.periode}>(Weekly)</span>
          <span className={Styles.fileName}>{file1}</span>
          <div className={Styles.download}  onClick={onButtonClick}>
              <span>Replace</span>
          </div>
          <div className={Styles.download}  onClick={() => onExport()}>
              <span>Download</span>
          </div>
        </div>

        <div className={Styles.insideBox}>
          <div className={Styles.miniBox}>
            <ExcelFileIcon />
          </div>
          <span className={Styles.periode}>(Monthly)</span>
          <span className={Styles.fileName}>{file1}</span>
          <div className={Styles.download}  onClick={() => onExport()}>
              <span>Replace</span>
          </div>
          <div className={Styles.download}  onClick={() => onExport()}>
              <span>Download</span>
          </div>
        </div>

        <div className={Styles.insideBox}>
          <div className={Styles.miniBox}>
            <ExcelFileIcon />
          </div>
          <span className={Styles.periode}>(Semester)</span>
          <span className={Styles.fileName}>{file1}</span>
          <div className={Styles.download}  onClick={() => onExport()}>
              <span>Replace</span>
          </div>
          <div className={Styles.download}  onClick={() => onExport()}>
              <span>Download</span>
          </div>
        </div>
      </div>
    )
  }

  const onButtonClick = () => {
    // `current` points to the mounted file input element
	inputFile.current.click();
  };
  
  const fileChange = (e) => {
    let files = e.target.files;
	console.log(files);
	
	setFile1(files[0].name);
  };

  return (
    <div>
      <input type='file' id='weekly' ref={inputFile} style={{display: 'none'}} onChange={(e) => fileChange(e)}/>
      {renderHeader()}
      {renderExportReport()}
      {renderHorizontalLine()}
      {renderTemplate()}
    </div>
  );
}
