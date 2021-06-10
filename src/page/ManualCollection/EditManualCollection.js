import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { InputWithLabel } from "../../components/Form";
import Styles from "./EditManualCollection.module.scss";
import { ChevronLeft } from "../../assets/icons";
import { Context } from "../../hooks/context";
import { http } from "../../utility/http";

export default function EditCollection() {
  const [remark, setRemark] = useState("");
  const [value, setValue] = useState("");
  const history = useHistory();
  const globalState = useContext(Context);
  const { manualCollection, dateSelected, machine, adminProfile } = globalState;

  useEffect(() => {
    setValue(manualCollection.value);
  }, []);

  const handleSave = async () => {
    let date = moment(dateSelected * 1000).format("YYYY-MM-DD");
    let startTime = moment(`${date} 07:00`).format("YYYY MM DD HH:mm");
    let curentTime = moment().format("YYYY MM DD HH:mm");

    const ms = Math.abs(new Date(startTime) - new Date(curentTime)) / 1000;
    const msa = (new Date(startTime) - new Date(curentTime)) / 1000;

    if (ms < 86400 && msa > 0) {
      date = moment(date).subtract(1, "days").format("YYYY-MM-DD");
    }

    const params = {
      method: "POST",
      path: "manual-collection",
      data: {
        machineId: machine.machineId,
        categoryId: manualCollection.categoryId,
        value: value,
        shift: manualCollection.shift,
        remark: remark,
        unit: manualCollection.unit,
        date: date,
        createdBy: adminProfile.id || null,
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      history.goBack();
    }
  };

  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <div onClick={() => history.goBack()} className={Styles.back}>
          <ChevronLeft />
        </div>
        <span>Edit Manual Collection</span>
      </div>
    );
  };

  const renderInputShift = () => {
    return (
      <InputWithLabel
        label={"Shift"}
        value={manualCollection.shift}
        disabled={true}
      />
    );
  };

  const renderDuration = () => {
    return (
      <InputWithLabel
        label={"Value"}
        value={value}
        unit={manualCollection.unit}
        name={"value"}
        setValue={setValue}
      />
    );
  };

  const renderCategory = () => {
    return (
      <>
        <InputWithLabel
          styleContainer={Styles.select}
          label={"Category"}
          value={manualCollection.categoryName}
          disabled={true}
        />
        <span className={Styles.note}>
          {/* {`Defect & Rework Losses / Defect / Burning particle/kotor`} */}
        </span>
      </>
    );
  };

  const renderRemark = () => {
    return (
      <InputWithLabel
        styleContainer={Styles.remark}
        label={"Remark"}
        value={remark}
        isTextarea={true}
        placeholder={"Write remak here"}
        setValue={setRemark}
      />
    );
  };

  const renderButton = () => {
    return (
      <div className={Styles.buttonContainer}>
        <button className={Styles.cancel}>Cancel</button>
        <button onClick={() => handleSave()} className={Styles.save}>
          Save
        </button>
      </div>
    );
  };

  return (
    <div>
      {renderHeader()}
      <div className={Styles.mainContent}>
        {renderInputShift()}
        {renderCategory()}
        {renderDuration()}
        {renderRemark()}
        {renderButton()}
      </div>
    </div>
  );
}
