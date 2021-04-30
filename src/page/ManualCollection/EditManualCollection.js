import React, { useState, useContext } from "react";
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
  const { manualCollection, dateSelected, machine } = globalState;

  const handleSave = async () => {
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
        date: moment(dateSelected * 1000).format("YYYY-MM-DD"),
        createdBy: "Budi Putra",
      },
    };

    const result = await http(params);

    if (result && result.code === "success") {
      history.goBack();
    }

    console.log("RESULT ", result);
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
