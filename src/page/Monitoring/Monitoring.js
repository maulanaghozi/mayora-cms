import React from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import HeaderDashboard from "./HeaderDashboard/HeaderDashboard";
import ProductionStatus from "./Screen/ProductionStatus/ProductionStatus";
import ProductionOutput from "./Screen/ProductionOutput/ProductionOutput";
import OEEvsTarget from "./Screen/OEEvsTarget/OEEvsTarget";
import OEE from "./Screen/OEE/OEE";
import Styles from "./Monitoring.module.scss";
import Date from "../../components/Header/Date/Date";
import Clock from "../../components/Header/Clock/Clock";
import { MinimizeIcon } from "../../assets/icons";

export default function Dashboard() {
  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <HeaderDashboard
          title={[
            "Production Status",
            "Production Output",
            "OEE",
            "OEE VS Target",
          ]}
          path={[
            "/monitoring-dashboard/production-status",
            "/monitoring-dashboard/production-output",
            "/monitoring-dashboard/oee",
            "/monitoring-dashboard/oee-vs-target",
          ]}
        />
        <div className={Styles.time_container}>
          <Date className={Styles.time} />
          <Clock className={Styles.time} />
          <Link to={"/dashboard"} style={{ marginLeft: 15 }}>
            <MinimizeIcon />
          </Link>
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    return (
      <Switch>
        <Route
          path={"/monitoring-dashboard/production-status"}
          component={ProductionStatus}
        />
        <Route
          path={"/monitoring-dashboard/production-output"}
          component={ProductionOutput}
        />
        <Route
          path={"/monitoring-dashboard/oee-vs-target"}
          component={OEEvsTarget}
        />
        <Route path={"/monitoring-dashboard/oee"} component={OEE} />
        <Route
          path={"/monitoring-dashboard"}
          render={() => (
            <Redirect to={"/monitoring-dashboard/production-status"} />
          )}
        />
      </Switch>
    );
  };
  return (
    <div className={Styles.dashboard_container}>
      {renderHeader()}
      {renderMainContent()}
    </div>
  );
}
