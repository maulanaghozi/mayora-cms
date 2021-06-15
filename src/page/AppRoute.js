import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AppLayout from "../layout/AppLayout/AppLayout";
import Dashboard from "./Dashboard/Dashboard";
import TroubleList from "./TroubleList/TroubleList";
import EditTrouble from "./TroubleList/EditTrouble";
import SelectCategory from "./TroubleList/SelectCategory";
import ManualCollection from "./ManualCollection/ManualCollection";
import EditManualCollection from "./ManualCollection/EditManualCollection";
import DetailManualCollection from "./ManualCollection/DetailManualCollection";
import Target from "./Target/Target";
import Release from "./Release/Release";
import MasterCategory from "./MasterCategory/MasterCategory";
import User from "./User/User";
import Report from "./Report/Report";

import { hasToken } from "../utility/utility";

export default function AppPage() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/trouble-list/edit/:id" component={EditTrouble} />
        <Route
          path="/trouble-list/select-category"
          component={SelectCategory}
        />
        <Route path="/trouble-list" component={TroubleList} />
        <Route
          path="/manual-collection/detail/:categoryId/:name"
          component={DetailManualCollection}
        />
        <Route
          path="/manual-collection/edit/:id"
          component={EditManualCollection}
        />
        <Route path="/manual-collection" component={ManualCollection} />
        <Route path="/target" component={Target} />
        <Route path="/output" component={Release} />
        <Route path="/master-category" component={MasterCategory} />
        <Route exact path="/user" component={User} />
        <Route exact path="/report" component={Report} />
        <Route
          path={"/"}
          render={() => (
            <Redirect to={hasToken() ? "/dashboard" : "/auth/login"} />
          )}
        />
      </Switch>
    </AppLayout>
  );
}
