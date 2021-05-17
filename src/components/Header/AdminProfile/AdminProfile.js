import React, { useState, useEffect, useRef, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { getToken, removeToken, hasToken } from "../../../utility/utility";
import { http } from "../../../utility/http";

import { ReactComponent as Chevron } from "../../../assets/chevron_bottom.svg";

import Styles, {
  container,
  icon,
  box,
  text,
  logout,
} from "./AdminProfile.module.scss";
import { useClickOutside } from "../../../hooks/useClickOutside/useClickOutside";
import { Context } from "../../../hooks/context";

export default function AdminProfile() {
  const [adminName, setAdminName] = useState("");
  const [role, setRole] = useState("");
  const [displayBox, setDisplayBox] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const context = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    getAdmin();
  }, []);

  const getAdmin = async () => {
    try {
      if (!hasToken()) {
        localStorage.removeItem("mayora-cms");
        return history.push("/auth/login");
      }

      const result = await http({
        method: "GET",
        path: "user/" + jwtDecode(getToken()).id,
      });

      if (result && result.code === "success") {
        setAdminName(result.payload.name);
        if (result.payload.role) {
          setRole(result.payload.role.name);
        }
        context.setAdminProfile(result.payload);
      } else {
        console.log(result);
        localStorage.removeItem("mayora-cms");
        history.push("/auth/login");
        console.error("token not valid");
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("mayora-cms");
      return history.push("/auth/login");
    }
  };

  const boxRef = useRef(null);

  useClickOutside(boxRef, () => {
    setDisplayBox(false);
  });

  const toggleBox = e => {
    setDisplayBox(!displayBox);
  };

  const logoutAdmin = e => {
    setAdminName(null);
    removeToken();
    setRedirect(true);
  };

  return (
    <div className={container}>
      <div className={text} onClick={toggleBox}>
        <div className={Styles.profileWrapper}>
          <span>{adminName}</span>
          <span className={Styles.role}>{role}</span>
        </div>
        <Chevron className={icon} width={20} />
      </div>
      {displayBox && (
        <div ref={boxRef} className={box}>
          <span className={logout} onClick={logoutAdmin}>
            {"Logout"}
          </span>
        </div>
      )}
      {redirect && <Redirect to={"/login"} />}
    </div>
  );
}
