import React, { useEffect, useState } from "react";
import moment from "moment";
import Styles from "./Report.module.scss";

export default function TroubleList() {
  useEffect(() => {
    const getDays = moment().format("YYYY MM DD");
    console.log(moment(`${getDays} 07:00`).format());
  }, []);

  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <span>Report</span>
      </div>
    );
  };

  return <div>{renderHeader()}</div>;
}
