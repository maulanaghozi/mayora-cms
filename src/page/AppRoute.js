import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";

import AppLayout from "../layout/AppLayout/AppLayout";
import Dashboard from "./Dashboard/Dashboard";
import TroubleList from "./TroubleList/TroubleList";
import ManualCollection from "./ManualCollection/ManualCollection";
import Target from "./Target/Target";
import Release from "./Release/Release";
import MasterCategory from "./MasterCategory/MasterCategory";
import HomeContent from "./HomeContent/HomeContent";
import Casting from "./Casting/Casting";
import CreateCasting from "./Casting/CreateCasting/CreateCasting";
import EditCasting from "./Casting/EditCasting/EditCasting";
import DetailCasting from "./Casting/DetailCasting/DetailCasting";
import ViewApplicant from "./Casting/ViewApplicant/ViewApplicant";
import ViewComment from "./Casting/ViewComment/ViewComment";
import User from "./User/User";
import Talent from "./User/Talent/Talent";
import TalentDetail from "./User/ViewTalent/ViewTalent";
import ViewTalentCasting from "./User/ViewTalentCasting/ViewTalentCasting";
import Recruiter from "./User/Recruiter/Recruiter";
import ViewRecruiter from "./User/ViewRecruiter/ViewRecruiter";
import ViewVideo from "./ViewVideo/ViewVideo";
import Group from "./Group/Group";
import Settings from "./Settings/Settings";
import CreateGroup from "./Group/CreateGroup/CreateGroup";
import Help from "./Help/Help";
import Report from "./Report/Report";
import Broadcast from "./Broadcast/Broadcast";

import { hasToken } from "../utility/utility";

export default function AppPage() {
  return (
    <AppLayout>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/trouble-list" component={TroubleList} />
        <Route path="/manual-collection" component={ManualCollection} />
        <Route path="/target" component={Target} />
        <Route path="/release" component={Release} />
        <Route path="/master-category" component={MasterCategory} />
        <Route path="/home-content" component={HomeContent} />
        <Route exact path="/casting" component={Casting} />
        <Route exact path="/casting/create" component={CreateCasting} />
        <Route exact path="/casting/edit/:id" component={EditCasting} />
        <Route
          exact
          path="/casting/view-applicant/:id"
          component={ViewApplicant}
        />
        <Route exact path="/casting/view-comment/:id" component={ViewComment} />
        <Route exact path="/casting/view-like/:id" component={ViewApplicant} />
        <Route exact path="/casting/detail/:id" component={DetailCasting} />
        <Route exact path="/user" component={User} />
        <Route exact path="/user/talent" component={Talent} />
        <Route
          exact
          path="/user/talent/:user_id/casting-application"
          component={ViewTalentCasting}
        />
        <Route path="/user/talent/:user_id" component={TalentDetail} />
        <Route exact path="/user/recruiter" component={Recruiter} />
        <Route path="/user/recruiter/:user_id" component={ViewRecruiter} />
        <Route
          path="/user/recruiter/:user_id/view-video"
          component={ViewVideo}
        />
        <Route exact path="/group" component={Group} />
        <Route exact path="/group/create" component={CreateGroup} />
        <Route exact path="/group/:id" component={Group} />
        <Route exact path="/group/:id/view-member" component={Group} />
        <Route path="/settings" component={Settings} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/report" component={Report} />
        <Route path="/broadcast" component={Broadcast} />
        <Route
          path={"/"}
          render={() => <Redirect to={true ? "/dashboard" : "/auth/login"} />}
        />
      </Switch>
    </AppLayout>
  );
}
