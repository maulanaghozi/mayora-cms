import React from "react";
import classNames from "classnames";

import { ReactComponent as LeftDoubleChevronIcon } from "../../../assets/chevrons_left.svg";

import {
  text,
  toggler_container,
  border,
  open,
  icon,
  text_container,
} from "./SidebarToggler.module.scss";

export default function SidebarToggler(props) {
  const toggle = () => {
    props.setIsOpen(!props.isOpen);
  };

  const openClass = props.isOpen ? open : "";

  return (
    <React.Fragment>
      <div className={classNames(border)} />
      <div className={classNames(toggler_container, openClass)}>
        <div className={text_container}>
          <div className={classNames(text, openClass)}>Minimize</div>
          <LeftDoubleChevronIcon
            className={icon}
            onClick={toggle}
            transform={props.isOpen ? "" : "scale(-1, 1)"}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
