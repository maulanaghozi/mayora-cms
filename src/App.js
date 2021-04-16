import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AuthRoute from "./page/Auth/AuthRoute";
import AppRoute from "./page/AppRoute";

import { hasToken } from "./utility/utility";
import "./App.module.scss";

const options = {
  timeout: 2500,
  position: positions.TOP_CENTER,
};

function App() {
  return (
    <Provider template={AlertTemplate} {...options}>
      <Router>
        <Switch>
          {/* <Route path={"/auth"} component={AuthRoute} /> */}
          <PrivateRoute path="/" auth={true}>
            <AppRoute />
          </PrivateRoute>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
