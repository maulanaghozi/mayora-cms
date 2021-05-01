import React, { useState, useEffect, useContext } from "react";
import { CustomModal } from "../../../../components/Modal/CustomModal/CustomModal";
import { InputWithLabel } from "../../../../components/Form/InputWithLable/InputWithLabel";
import TargetOEETable from "../../Tables/TargetOEE/TargetOEETable";
import Styles from "./TargetOEE.module.scss";
import moment from "moment";
import { Context } from "../../../../hooks/context";
import { http } from "../../../../utility/http";

export default function TargetOEE() {
  const [modalVisible, setModalVisible] = useState(false);
  const [oeeTarget, setOeeTarget] = useState(0);
  const [logData, setLogData] = useState([]);

  const globalState = useContext(Context);
  const { machine, dateSelected } = globalState;

  useEffect(() => {
    getOeeTarget();
    getOeeTargetLog();
  }, [machine.machineId, dateSelected]);

  const getOeeTarget = async () => {
    const params = {
      method: "GET",
      path: "oee-target/target",
      query: {
        machineId: machine.machineId,
      },
    };

    const result = await http(params);
    if (result && result.code === "success") {
      setOeeTarget(result.payload.target);
    } else {
      setOeeTarget(0);
    }
  };

  const getOeeTargetLog = async () => {
    let date = moment(dateSelected * 1000).format("YYYY-MM-DD");
    let startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(curentTime) - new Date(startTime)) / 1000;
    const msa = (new Date(startTime) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      date = moment(date).subtract(1, "days").format("YYYY-MM-DD");
    }

    const params = {
      method: "GET",
      path: "oee-target",
      query: {
        machineId: machine.machineId,
        date: date,
        sort: "desc",
      },
    };

    const result = await http(params);
    if (result && result.code === "success") {
      setLogData(result.payload.results);
    } else {
      setLogData([]);
    }
  };

  const handleSaveOEE = async () => {
    const params = {
      method: "PUT",
      path: "oee-target",
      data: {
        machineId: machine.machineId,
        target: oeeTarget,
      },
    };

    const result = await http(params);
    if (result && result.code === "success") {
      console.log("BERHASIL ", result);
      setModalVisible(false);
      getOeeTargetLog();
    } else {
      console.log("GAGAL ", result);
    }
  };

  const renderTargetOEE = () => {
    return (
      <div className={Styles.cardTarget}>
        <div className={Styles.titleContainer}>
          <span className={Styles.title}>OEE Target</span>
        </div>
        <div className={Styles.targetValueContainer}>
          <span className={Styles.targetValue}>{`${oeeTarget} %`}</span>
          <span onClick={() => setModalVisible(true)} className={Styles.edit}>
            Edit
          </span>
        </div>
      </div>
    );
  };

  const renderTable = () => {
    return <TargetOEETable data={logData} />;
  };

  const renderModalEditOEETarget = () => {
    return (
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={"Set New OEE Target"}
      >
        <InputWithLabel
          label={"Target"}
          value={oeeTarget}
          setValue={setOeeTarget}
          name={"oee"}
        />
        <div className={Styles.buttonContainer}>
          <button
            onClick={() => setModalVisible(false)}
            className={Styles.cancel}
          >
            Cancel
          </button>
          <button onClick={() => handleSaveOEE()} className={Styles.save}>
            Save
          </button>
        </div>
      </CustomModal>
    );
  };
  return (
    <div className={Styles.container}>
      {renderTargetOEE()}
      {renderTable()}
      {renderModalEditOEETarget()}
    </div>
  );
}
