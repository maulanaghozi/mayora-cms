import React from "react";
import { CalendarIcon } from "../../../assets/icons/index";
import moment from "moment";
import Styles from "./Date.module.scss";

export default function HelpNotif() {
  return (
    <div className={Styles.container}>
      <CalendarIcon className={Styles.icon} />
      <span>{moment().format("dddd, DD/MM/YYYY")}</span>
    </div>
  );
}
