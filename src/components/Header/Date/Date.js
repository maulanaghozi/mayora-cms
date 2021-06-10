import React from "react";
import { CalendarIcon } from "../../../assets/icons/index";
import classNames from "classnames";
import Clock from "react-live-clock";
import Styles from "./Date.module.scss";

export default function HelpNotif(props) {
  const { className } = props;
  return (
    <div className={Styles.container}>
      <CalendarIcon className={Styles.icon} />
      <Clock
        className={classNames(Styles.clock, className)}
        format={"dddd, DD/MM/YYYY"}
        ticking={true}
        timezone={"Asia/Jakarta"}
      />
    </div>
  );
}
