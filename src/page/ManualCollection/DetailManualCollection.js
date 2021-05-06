import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import Styles from "./DetailManualCollection.module.scss";
import ManualCollectionTable from "./TableDetailManualCollection/TableDetailManualCollection";
import { ChevronLeft } from "../../assets/icons";
import { Context } from "../../hooks/context";
import { http } from "../../utility/http";

export default function DetailManualCollection() {
  const [dataLog, setDataLog] = useState([]);
  const history = useHistory();
  const { categoryId, name } = useParams();
  const globalState = useContext(Context);
  const { dateSelected, machine } = globalState;

  useEffect(() => {
    console.log(name);
    getDataLog();
  }, []);

  const getDataLog = async () => {
    let date = moment(dateSelected * 1000).format("YYYY-MM-DD");
    let startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(startTime) - new Date(curentTime)) / 1000;
    const msa = (new Date(startTime) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      date = moment(date).subtract(1, "days").format("YYYY-MM-DD");
    }

    const params = {
      method: "GET",
      path: "manual-collection/log",
      query: {
        machineId: machine.machineId,
        categoryId: categoryId,
        date: date,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      setDataLog(result.payload.results);
    } else {
      setDataLog([]);
    }
  };

  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <div onClick={() => history.goBack()} className={Styles.back}>
          <ChevronLeft />
        </div>
        <span>{`Detail ${name}`}</span>
      </div>
    );
  };

  const renderTable = () => {
    return <ManualCollectionTable data={dataLog} />;
  };

  return (
    <div>
      {renderHeader()}
      {renderTable()}
    </div>
  );
}
