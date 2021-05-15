import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { http } from "../../../utility/http";

import AuthHeader from "../../../components/Auth/AuthHeader/AuthHeader";
import AuthButton from "../../../components/Auth/AuthButton/AuthButton";
import InputBox from "../../../components/Auth/AuthInputBox/AuthInputBox";

import { ReactComponent as MailIconDark } from "../../../assets/mail_dark.svg";
import { ReactComponent as MailIconLight } from "../../../assets/mail_light.svg";

import { cancel } from "./ForgotPassword.module.scss";
import { validateEmail } from "../../../utility/utility";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sassionId, setSassionId] = useState(null);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (sassionId) {
      setRedirect(true);
    }
  }, [sassionId]);

  const handleTextChange = e => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (email) {
      if (validateEmail(email)) {
        const params = {
          method: "POST",
          path: "authentication/forgot-password",
          data: {
            email: email,
          },
        };
        http(params)
          .then(data => {
            if (data && data.code === "success") {
              setSassionId(data.payload.sassionId);
            } else {
              setEmailErrorMsg(
                "Something went wrong please check your internet access"
              );
            }
          })
          .catch(err => console.error(err));
      } else {
        setEmailErrorMsg("Your email address is invalid");
      }
    } else {
      setEmailErrorMsg("Masukkan alamat email");
    }
  };

  const emailAttr = {
    Icon: MailIconDark,
    FocusIcon: MailIconLight,
    inputAttr: {
      name: "email",
      type: "text",
      value: email,
      onChange: handleTextChange,
      placeholder: "Email",
    },
    errorMsg: emailErrorMsg,
    setErrorMsg: setEmailErrorMsg,
  };

  return (
    <React.Fragment>
      <AuthHeader
        primaryText={"Forgot Password"}
        secondaryText={
          "Enter your E-mail and we will send email verification to change your password"
        }
      />
      <form
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      >
        <InputBox {...emailAttr} />
      </form>
      <AuthButton onClick={handleSubmit} text={"SEND VERIFICATION"} />
      <Link className={cancel} to={"/auth/login"}>
        CANCEL
      </Link>
      {redirect && (
        <Redirect
          to={{
            pathname: "/auth/verify-code",
            state: { email: email, sassionId: sassionId },
          }}
        />
      )}
    </React.Fragment>
  );
}
