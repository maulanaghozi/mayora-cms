import React from "react";
import moment from "moment";
import Styles from "./ReworkLosses.module.scss";

export default function RewarkLosses() {
  const renderDefaultTarget = () => {
    return (
      <div className={Styles.cardTarget}>
        <div className={Styles.titleContainer}>
          <span className={Styles.title}>Default Target</span>
        </div>
        <div className={Styles.targetValueContainer}>
          <span className={Styles.targetValue}>3000</span>
          <span className={Styles.edit}>Edit</span>
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
          <span className={Styles.targetValue}>3000</span>
          <span className={Styles.edit}>Edit</span>
        </div>
        <p className={Styles.desc}>
          Current target akan berlaku hanya untuk hari ini. Waktu mulai aktif
          dapat diatur sesuai keinginan.
        </p>
      </div>
    );
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.cardTargetContainer}>
        {renderDefaultTarget()}
        {renderCurrentTarget()}
      </div>
    </div>
  );
}
