import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HeaderDashboard from "./HeaderDashboard/HeaderDashboard";
import ProductionStatus from "./Screen/ProductionStatus/ProductionStatus";
import ProductionOutput from "./Screen/ProductionOutput/ProductionOutput";
import OEEvsTarget from "./Screen/OEEvsTarget/OEEvsTarget";
import OEE from "./Screen/OEE/OEE";
import Styles from "./Dashboard.module.scss";

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
            "/dashboard/production-status",
            "/dashboard/production-output",
            "/dashboard/oee",
            "/dashboard/oee-vs-target",
          ]}
        />
      </div>
    );
  };

  const renderMainContent = () => {
    return (
      <Switch>
        <Route
          path={"/dashboard/production-status"}
          component={ProductionStatus}
        />
        <Route
          path={"/dashboard/production-output"}
          component={ProductionOutput}
        />
        <Route path={"/dashboard/oee-vs-target"} component={OEEvsTarget} />
        <Route path={"/dashboard/oee"} component={OEE} />
        <Route
          path={"/dashboard"}
          render={() => <Redirect to={"/dashboard/production-status"} />}
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
