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
  change,
} from "./AdminProfile.module.scss";
import { useClickOutside } from "../../../hooks/useClickOutside/useClickOutside";
import { Context } from "../../../hooks/context";

export default function AdminProfile() {
  const [adminName, setAdminName] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState({
    name: "",
    roleId: "",
    machine1: true,
    machine2: true,
    user: {},
  });
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
        setUser(result.payload);
        setAdminName(result.payload.name);
        if (result.payload.role) {
          setRole(result.payload.role.name);
        }
        context.setAdminProfile(result.payload);
        if (result.payload.machine1) {
          context.setMachine({
            machineId: "00f5eafd-89c5-4871-a982-26a8180774c7",
            machineName: "Line 1",
          });
        } else {
          context.setMachine({
            machineId: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
            machineName: "Line 2",
          });
        }
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

  const hanldeDisplayRole = () => {
    let result = role;
    if (user.roleId === "ROLE-USER-MYR003") {
      const machineNames = [];

      if (user.machine1) machineNames.push("Line 1");
      if (user.machine2) machineNames.push("Line 2");

      const machineAccess = machineNames.join(",");
      result = result + ` (${machineAccess})`;
    }

    return result;
  };

  return (
    <div className={container}>
      <div className={text} onClick={toggleBox}>
        <div className={Styles.profileWrapper}>
          <span>{adminName}</span>
          <span className={Styles.role}>{hanldeDisplayRole()}</span>
        </div>
        <Chevron className={icon} width={20} />
      </div>
      {displayBox && (
        <div ref={boxRef} className={box}>
          <span
            className={change}
            onClick={() => context.setModalChangePassVisible(true)}
          >
            {"Change Password"}
          </span>
          <span className={logout} onClick={logoutAdmin}>
            {"Logout"}
          </span>
        </div>
      )}
      {redirect && <Redirect to={"/login"} />}
    </div>
  );
}
