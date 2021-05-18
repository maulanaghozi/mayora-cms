import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import ProductionTargetTable from "../../Tables/ProductionTarget/ProductionTargetTable";
import { CustomModal } from "../../../../components/Modal/CustomModal/CustomModal";
import { InputWithLabel } from "../../../../components/Form/InputWithLable/InputWithLabel";
import { http } from "../../../../utility/http";
import Styles from "./ProductionTarget.module.scss";
import { Context } from "../../../../hooks/context";

export default function ProductionTarget() {
  const [modalDefaultVisible, setModalDefaultVisible] = useState(false);
  const [modalCurrentVisible, setModalCurrentVisible] = useState(false);
  const [defaultTarget, setDefaultTarget] = useState(0);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [activeTarget, setActveTarget] = useState(
    moment().format("YYYY-MM-DD HH:mm")
  );
  const [logData, setLogData] = useState([]);

  const globalState = useContext(Context);
  const { machine, dateSelected, adminProfile } = globalState;

  useEffect(() => {
    getDefaultTarget();
    getProductionTarget();
    getCurrentLog();
  }, [machine.machineId, dateSelected]);

  const getCurrentLog = async () => {
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
      path: "production-target",
      query: {
        machineId: machine.machineId,
        date: date,
        sort: "asc",
      },
    };

    const result = await http(params);
    if (result && result.code === "success") {
      setLogData(result.payload.results);
    } else {
      setLogData([]);
    }
  };

  const getDefaultTarget = async () => {
    const params = {
      method: "GET",
      path: "default-target/target",
      query: {
        machineId: machine.machineId,
      },
    };

    const result = await http(params);
    if (result && result.code === "success") {
      setDefaultTarget(result.payload.target);
    } else {
      setDefaultTarget(0);
    }
  };

  const handleSaveDefault = async () => {
    const params = {
      method: "PUT",
      path: "default-target",
      data: {
        machineId: machine.machineId,
        target: defaultTarget,
        updatedBy: adminProfile.id || null,
      },
    };

    const result = await http(params);
    if (result && result.code === "success") {
      setModalDefaultVisible(false);
    } else {
      console.log("GAGAL ", result);
    }
  };

  const handleSaveCurrentTarget = async () => {
    const params = {
      method: "PUT",
      path: "production-target",
      data: {
        machineId: machine.machineId,
        target: currentTarget,
        activeTarget: activeTarget,
        updatedBy: adminProfile.id || null,
      },
    };

    const result = await http(params);
    if (result && result.code === "success") {
      setModalCurrentVisible(false);
      getCurrentLog();
    } else {
      console.log("GAGAL ", result);
    }
  };

  const getProductionTarget = async () => {
    const params = {
      method: "GET",
      path: "production-target/target",
      query: {
        machineId: machine.machineId,
      },
    };

    const result = await http(params);
    if (result && result.code === "success") {
      console.log("BERHASIL CURRENT ", result);
      setCurrentTarget(result.payload.target);
    } else {
      setCurrentTarget(0);
    }
  };

  const renderDefaultTarget = () => {
    return (
      <div className={Styles.cardTarget}>
        <div className={Styles.titleContainer}>
          <span className={Styles.title}>Default Target</span>
        </div>
        <div className={Styles.targetValueContainer}>
          <span className={Styles.targetValue}>{defaultTarget}</span>
          {adminProfile && adminProfile.roleId !== "ROLE-USER-MYR003" && (
            <span
              onClick={() => setModalDefaultVisible(true)}
              className={Styles.edit}
            >
              Edit
            </span>
          )}
        </div>
        <p className={Styles.desc}>
          Default target akan berlaku seterusnya sebagai nilai awal apabila
          tidak ada pergantian nilai target
        </p>
      </div>
    );
  };

  const renderCurrentTarget = () => {
    return (
      <div className={Styles.cardTarget}>
        <div className={Styles.titleContainer}>
          <span className={Styles.title}>Current Target</span>
          <span className={Styles.dateCard}>
            {moment().format("DD MMM YYYY")}
          </span>
        </div>
        <div className={Styles.targetValueContainer}>
          <span className={Styles.targetValue}>{currentTarget}</span>
          {adminProfile && adminProfile.roleId !== "ROLE-USER-MYR003" && (
            <span
              onClick={() => setModalCurrentVisible(true)}
              className={Styles.edit}
            >
              Edit
            </span>
          )}
        </div>
        <p className={Styles.desc}>
          Current target akan berlaku hanya untuk hari ini. Waktu mulai aktif
          dapat diatur sesuai keinginan.
        </p>
      </div>
    );
  };
  const renderTable = () => {
    return <ProductionTargetTable data={logData} />;
  };

  const renderModalEditDefaultTarget = () => {
    return (
      <CustomModal
        visible={modalDefaultVisible}
        onClose={() => setModalDefaultVisible(false)}
        title={"Set New Default Target"}
      >
        <InputWithLabel
          label={"Target"}
          value={defaultTarget}
          setValue={setDefaultTarget}
          name={"target"}
        />
        <div className={Styles.buttonContainer}>
          <button
            onClick={() => setModalDefaultVisible(false)}
            className={Styles.cancel}
          >
            Cancel
          </button>
          <button onClick={() => handleSaveDefault()} className={Styles.save}>
            Save
          </button>
        </div>
      </CustomModal>
    );
  };
  const renderModalEditCurrentTarget = () => {
    return (
      <CustomModal
        visible={modalCurrentVisible}
        onClose={() => setModalCurrentVisible(false)}
        title={"Set New Production Target"}
      >
        <InputWithLabel
          label={"Target"}
          value={currentTarget}
          setValue={setCurrentTarget}
          name={"current"}
        />
        <InputWithLabel
          label={"Active Target"}
          value={activeTarget}
          setValue={setActveTarget}
          isHourSelected={true}
          name={"activetarget"}
        />
        <div className={Styles.buttonContainer}>
          <button
            onClick={() => setModalCurrentVisible(false)}
            className={Styles.cancel}
          >
            Cancel
          </button>
          <button
            onClick={() => handleSaveCurrentTarget()}
            className={Styles.save}
          >
            Save
          </button>
        </div>
      </CustomModal>
    );
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.cardTargetContainer}>
        {renderDefaultTarget()}
        {renderCurrentTarget()}
      </div>
      {renderTable()}
      {renderModalEditDefaultTarget()}
      {renderModalEditCurrentTarget()}
    </div>
  );
}
