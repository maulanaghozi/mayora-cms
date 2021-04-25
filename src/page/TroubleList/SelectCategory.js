import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Styles from "./SelectCategory.module.scss";

export default function SelectCategory() {
  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <span>Select Category</span>
        <PageTitle
          title={[
            "Not Operating Day & Planned Down Time",
            "Down Time Losses",
            "Speed Losses",
            "Defect & Rework Losses",
          ]}
          path={[
            "/trouble-list/select-category/planed-down-time",
            "/trouble-list/select-category/down-time-losses",
            "/trouble-list/select-category/speed-losses",
            "/trouble-list/select-category/rework-losses",
          ]}
        />
      </div>
    );
  };

  return <div>{renderHeader()}</div>;
}
