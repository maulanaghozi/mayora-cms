import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { InputWithLabel } from "../../components/Form";
import Styles from "./EditManualCollection.module.scss";
import { ChevronLeft } from "../../assets/icons";
import { Context } from "../../hooks/context";
import { http } from "../../utility/http";

export default function EditCollection() {
  const [minutesPass, setMinutesPass] = useState(0);
  const [remark, setRemark] = useState("");
  const history = useHistory();
  const globalState = useContext(Context);
  const { manualCollection } = globalState;

  useEffect(() => {
    let getDays = moment().format("YYYY MM DD");
    let curentTime = moment().format("YYYY MM DD HH:mm");
    let startDay = moment(`${getDays} 07:00`).format("YYYY MM DD HH:mm");

    if (curentTime < startDay) {
      getDays = moment(getDays).subtract(1, "days").format("YYYY MM DD");
      startDay = moment(`${getDays} 07:00`).format("YYYY MM DD HH:mm");
    }

    const ms = Math.abs(new Date(curentTime) - new Date(startDay)) / 1000;
    setMinutesPass(ms / 60);
  }, []);

  const handleSave = () => {
    const params = {
      method: "POST",
      path: "",
      data: {},
    };
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
        value={manualCollection.value}
        unit={manualCollection.unit}
        name={"value"}
        setValue={() => {}}
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
        value={manualCollection.remark}
        isTextarea={true}
        placeholder={"Write remak here"}
        setValue={() => {}}
      />
    );
  };

  const renderButton = () => {
    return (
      <div className={Styles.buttonContainer}>
        <button className={Styles.cancel}>Cancel</button>
        <button className={Styles.save}>Save</button>
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
