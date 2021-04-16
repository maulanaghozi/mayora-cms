import React from "react";
import useHeader from "../../hooks/useHeader/useHeader";

import UserJoin from "../../components/Dashboard/UserJoin/UserJoin";
import UserClassification from "../../components/Dashboard/UserClassification/UserClassification";
import Promo from "../../components/Dashboard/Promo/Promo";
import ActiveJobs from "../../components/Dashboard/ActiveJobs/ActiveJobs";
import ReportList from "../../components/Dashboard/ReportList/ReportList";

import {
  dashboard_container,
  bottom_row,
  bottom_left,
} from "./Dashboard.module.scss";

export default function Dashboard() {
  useHeader({ title: ["Dashboard"], path: ["/dashboard"] });

  return (
    <div className={dashboard_container}>
      {/* <UserJoin />
			<UserClassification />
            <div className={bottom_row}>
                <div className={bottom_left}>
                    <Promo />
                    <ActiveJobs />
                </div>
                <ReportList />
            </div> */}
    </div>
  );
}
