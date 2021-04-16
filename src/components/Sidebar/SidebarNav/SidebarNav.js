import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import {
  text_container,
  link,
  selected,
  text,
  icon,
  open,
  filler,
} from "./SidebarNav.module.scss";

export default function SidebarNav(props) {
  return (
    <NavLink
      className={link}
      activeClassName={selected}
      to={props.to}
      isActive={(match, location) => {
        if (!match) {
          return false;
        }
        return true;
      }}
    >
      <div className={classNames(text_container, props.isOpen ? open : "")}>
        <props.Icon className={icon} />
        <div className={classNames(text, props.isOpen ? open : "")}>
          <span>{props.text}</span>
        </div>
        <div className={classNames(filler, props.isOpen ? open : "")}></div>
      </div>
    </NavLink>
  );
}
