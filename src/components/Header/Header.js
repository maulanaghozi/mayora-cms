import React, { useContext } from "react";
import classNames from "classnames";
import { header_container, border, open } from "./Header.module.scss";
import HeaderPath from "./HeaderPath/HeaderPath";
import Date from "./Date/Date";
import Clock from "./Clock/Clock";
import AdminProfile from "./AdminProfile/AdminProfile";

export default function Header(props) {
  return (
    <div className={classNames(header_container, props.isOpen ? open : "")}>
      <HeaderPath {...props} />
      <Date />
      <Clock />
      <div className={border} />
      <AdminProfile />
    </div>
  );
}
