import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import PushNotification from "./PushNotification";
import EmailMarketing from "./EmailMarketing";
import SendPushNotif from "./SendPushNotif";
import SendEmail from "./SendEmail";
import style from "./Broadcast.module.scss";

export default function Broadcast() {
  const location = useLocation();
  const [isPageCreate, setIsPageCretae] = useState(false);

  useEffect(() => {
    if (location) {
      const pathnameArr = location.pathname.split("/");
      if (
        pathnameArr[pathnameArr.length - 1] === "create" ||
        pathnameArr[pathnameArr.length - 2] === "edit"
      ) {
        setIsPageCretae(true);
      } else {
        setIsPageCretae(false);
      }
    }
  }, [location.pathname]);

  return (
    <div className={style.container}>
      {!isPageCreate && (
        <PageTitle
          title={["Push Notification", "Email Marketing"]}
          path={["/broadcast/push-notification", "/broadcast/push-email"]}
          separatorLine={true}
        />
      )}
      <Switch>
        <Route
          exact
          path={"/broadcast/push-notification"}
          component={PushNotification}
        />
        <Route
          exact
          path={"/broadcast/push-notification/create"}
          component={SendPushNotif}
        />
        <Route path={"/broadcast/push-email"} component={EmailMarketing} />
        <Route
          exact
          path={"/broadcast/push-email/create"}
          component={SendEmail}
        />
        <Route
          exact
          path={"/broadcast"}
          render={() => <Redirect to={"/broadcast/push-notification"} />}
        />
      </Switch>
    </div>
  );
}
