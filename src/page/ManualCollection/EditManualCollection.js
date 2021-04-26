import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { InputWithLabel } from "../../components/Form";
import Styles from "./EditManualCollection.module.scss";
import { ChevronLeft } from "../../assets/icons";

export default function EditCollection() {
  const [minutesPass, setMinutesPass] = useState(0);
  const [remark, setRemark] = useState("");

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

  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <Link to={"/trouble-list"} className={Styles.back}>
          <ChevronLeft />
        </Link>
        <span>Edit Manual Collection</span>
      </div>
    );
  };

  const renderInputShift = () => {
    return <InputWithLabel label={"Shift"} value={"shift 1"} disabled={true} />;
  };

  const renderDuration = () => {
    return <InputWithLabel label={"Value"} value={"20"} unit={"Min."} />;
  };

  const renderCategory = () => {
    return (
      <>
        <InputWithLabel
          styleContainer={Styles.select}
          label={"Category"}
          value={"Trouble Kompresor/Angin"}
          disabled={true}
        />
        <span className={Styles.note}>
          {`Defect & Rework Losses / Defect / Burning particle/kotor`}
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
