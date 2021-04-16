import React, { useState, useEffect, useRef, useContext } from "react";
import { Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { getToken, removeToken } from "../../../utility/utility";
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
  const [displayBox, setDisplayBox] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const context = useContext(Context);

  useEffect(() => {
    try {
      http({
        method: "GET",
        path: "profiles/user/" + jwtDecode(getToken()).user_id,
      }).then(result => {
        if (result && result.code === "success") {
          setAdminName(result.payload.name);
          context.setAdminProfile(result.payload);
        }
      });
    } catch {
      console.error("token not valid");
    }
  }, []);

  const boxRef = useRef(null);

  useClickOutside(boxRef, () => {
    setDisplayBox(false);
  });

  const toggleBox = e => {
    setDisplayBox(!displayBox);
  };

  const logoutAdmin = e => {
    // setAdminName(null);
    // setRedirect(true);
    // removeToken();
  };

  return (
    <div className={container}>
      <div className={text} onClick={toggleBox}>
        <div className={Styles.profileWrapper}>
          <span>Budi Putra</span>
          <span className={Styles.role}>Administrator</span>
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
