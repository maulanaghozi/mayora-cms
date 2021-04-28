import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import NotOperating from "./Screen/NotOperating/NotOperating";
import DownTimeLosses from "./Screen/DownTimeLosses/DownTimeLosses";
import SpeedLosses from "./Screen/SpeedLosses/SpeedLosses";
import RewarkLosses from "./Screen/ReworkLosses/RewarkLosses";
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
            "Defect & Rework Losses",
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

  const renderMainContent = () => {
    return (
      <Switch>
        <Route
          path={"/master-category/planed-down-time"}
          component={NotOperating}
        />
        <Route
          path={"/master-category/down-time-losses"}
          component={DownTimeLosses}
        />
        <Route path={"/master-category/speed-losses"} component={SpeedLosses} />
        <Route
          path={"/master-category/rework-losses"}
          component={RewarkLosses}
        />
        <Route
          path={"/master-category"}
          render={() => <Redirect to={"/master-category/planed-down-time"} />}
        />
      </Switch>
    );
  };

  return (
    <div>
      {renderHeader()}
      {renderMainContent()}
    </div>
  );
}
