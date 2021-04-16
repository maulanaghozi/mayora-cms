import React from "react";
import Styles from "./User.module.scss";

export default function TroubleList() {
  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <span>User Management</span>
      </div>
    );
  };

  return <div>{renderHeader()}</div>;
}
