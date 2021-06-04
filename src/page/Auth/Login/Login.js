import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { http } from "../../../utility/http";

import InputBox from "../../../components/Auth/AuthInputBox/AuthInputBox";
import AuthButton from "../../../components/Auth/AuthButton/AuthButton";

import { UsernameIcon, LockIcon } from "../../../assets/icons";

import { forgot } from "./Login.module.scss";

import { useAlert } from "react-alert";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [redirect, setRedirect] = useState(false);

  const alert = useAlert();

  const handleTextChange = e => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const params = {
          method: "post",
          path: "authentication/login",
          data: {
            email: email,
            password: password,
          },
        };

        const data = await http(params);

        if (data && data.code === "success") {
          localStorage.setItem("mayora-cms", data.payload.token);
          setRedirect(true);
        } else {
          if (data) {
            setEmailErrorMsg(data);
          } else {
            setEmailErrorMsg(
              "Something's wrong, please contact our administrator"
            );
          }
        }
      } catch (err) {
        alert.error(err);
      }
    } else if (email) {
      setPasswordErrorMsg("Masukkan password");
    } else {
      setEmailErrorMsg("Masukkan username");
    }
  };

  const emailAttr = {
    Icon: UsernameIcon,
    inputAttr: {
      name: "email",
      type: "text",
      value: email,
      onChange: handleTextChange,
      placeholder: "Username",
    },
    errorMsg: emailErrorMsg,
    setErrorMsg: setEmailErrorMsg,
  };

  const passwordAttr = {
    Icon: LockIcon,
    inputAttr: {
      name: "password",
      type: "password",
      value: password,
      onChange: handleTextChange,
      placeholder: "Password",
    },
    errorMsg: passwordErrorMsg,
    setErrorMsg: setPasswordErrorMsg,
  };

  return (
    <React.Fragment>
      <form
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      >
        <InputBox {...emailAttr} />
        <InputBox {...passwordAttr} />
      </form>
      <AuthButton onClick={handleSubmit} text={"Login"} />
      <Link className={forgot} to={"/auth/forgot-password"}>
        FORGOT PASSWORD ?
      </Link>
      {redirect && (
        <Redirect
          to={props.location.state ? props.location.state.from : "/dashboard"}
        />
      )}
    </React.Fragment>
  );
}
