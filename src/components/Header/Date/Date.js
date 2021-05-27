import React from "react";
import { CalendarIcon } from "../../../assets/icons/index";
import Clock from "react-live-clock";
import moment from "moment";
import Styles from "./Date.module.scss";

export default function HelpNotif() {
  return (
    <div className={Styles.container}>
      <CalendarIcon className={Styles.icon} />
      <Clock
        className={Styles.clock}
        format={"dddd, DD/MM/YYYY"}
        ticking={true}
        timezone={"Asia/Jakarta"}
      />
      {/* <span>{moment().format("dddd, DD/MM/YYYY")}</span> */}
    </div>
  );
}
