import React, { useContext } from "react";
import classNames from "classnames";
import { ReactComponent as Logo } from "../../../assets/mayora-logo.svg";
import { ReactComponent as LogoText } from "../../../assets/mayora-text.svg";
import { header_container, text, open } from "./SidebarHeader.module.scss";

export default function SideBarHeader(props) {
  return (
    <div className={classNames(header_container, { [open]: props.isOpen })}>
      <span>
        <Logo className={classNames({ [open]: props.isOpen })} />
        <LogoText className={classNames(text, { [open]: props.isOpen })} />
      </span>
    </div>
  );
}
