import React from "react";
import { Link } from "react-router-dom";

import AuthHeader from "../../../components/Auth/AuthHeader/AuthHeader";

import { cancel } from "./ForgotPassword.module.scss";

export default function ForgotPassword() {
  return (
    <React.Fragment>
      <AuthHeader primaryText={"Forgot Password"} />
      <span
        style={{
          fontFamily: "roboto",
          textAlign: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        Please contact Administrator <br />
        to reset your password.
      </span>
      <Link className={cancel} to={"/auth/login"}>
        CANCEL
      </Link>
    </React.Fragment>
  );
}
