import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AppLayout from "../layout/AppLayout/AppLayout";
import Dashboard from "./Dashboard/Dashboard";
import TroubleList from "./TroubleList/TroubleList";
import EditTrouble from "./TroubleList/EditTrouble";
import ManualCollection from "./ManualCollection/ManualCollection";
import Target from "./Target/Target";
import Release from "./Release/Release";
import MasterCategory from "./MasterCategory/MasterCategory";
import User from "./User/User";
import Report from "./Report/Report";

export default function AppPage() {
  return (
    <AppLayout>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/trouble-list/edit/:id" component={EditTrouble} />
        <Route path="/trouble-list" component={TroubleList} />
        <Route path="/manual-collection" component={ManualCollection} />
        <Route path="/target" component={Target} />
        <Route path="/release" component={Release} />
        <Route path="/master-category" component={MasterCategory} />
        <Route exact path="/user" component={User} />
        <Route exact path="/report" component={Report} />
        <Route path={"/"} render={() => <Redirect to={"/dashboard"} />} />
      </Switch>
    </AppLayout>
  );
}
