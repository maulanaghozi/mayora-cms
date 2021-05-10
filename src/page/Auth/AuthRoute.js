import React from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";

import ForgotPassword from "./ForgotPassword/ForgotPassword";
import VerifyCode from "./VerifyCode/VerifyCode";
import ResetPassword from "./ResetPassword/ResetPassword";
import BackToLogin from "./BackLogin/BackLogin";
import Login from "./Login/Login";
import AuthBackground from "../../layout/AuthLayout/AuthLayout";
import { hasToken } from "../../utility/utility";

export default function AuthPage() {
  const path = useRouteMatch().path;

  return (
    <AuthBackground>
      <Switch>
        <Route exact path={`${path}/login`} component={Login} />
        <Route
          exact
          path={`${path}/forgot-password`}
          component={ForgotPassword}
        />
        <Route exact path={`${path}/verify-code`} component={VerifyCode} />
        <Route
          exact
          path={`${path}/reset-password`}
          component={ResetPassword}
        />
        <Route exact path={`${path}/back-to-login`} component={BackToLogin} />
        <Route path={`${path}/`} render={() => <Redirect to={"/"} />} />
      </Switch>
      {true && <Redirect to={"/dashboard"} />}
    </AuthBackground>
  );
}
