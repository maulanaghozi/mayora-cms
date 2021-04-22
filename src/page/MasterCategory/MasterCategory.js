import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Styles from "./MasterCategory.module.scss";

export default function TroubleList() {
  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <span>Master Category</span>
        <PageTitle
          title={[
            "Not Operating Day & Planned Down Time",
            "Down Time Losses",
            "Speed Losses",
            "Defect & Rework Losses (3)",
          ]}
          path={[
            "/master-category/planed-down-time",
            "/master-category/down-time-losses",
            "/master-category/speed-losses",
            "/master-category/rework-losses",
          ]}
        />
      </div>
    );
  };

  return <div>{renderHeader()}</div>;
}
