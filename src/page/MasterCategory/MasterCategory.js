import React from "react";
import Styles from "./MasterCategory.module.scss";

export default function TroubleList() {
  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <span>Master Category</span>
      </div>
    );
  };

  return <div>{renderHeader()}</div>;
}
