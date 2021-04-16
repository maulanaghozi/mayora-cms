import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  useLocation,
} from "react-router-dom";
import { hasToken } from "../../utility/utility";

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location.pathname },
            }}
          />
        );
      }}
    />
  );
}
