import React from "react";
import Clock from "react-live-clock";
import { FieldTime } from "../../../assets/icons/index";
import Styles, { container, icon } from "./Clock.module.scss";

export default function HelpNotif() {
  return (
    <div className={container}>
      <FieldTime className={icon} />
      <Clock
        className={Styles.clock}
        format={"HH:mm:ss"}
        ticking={true}
        timezone={"Asia/Jakarta"}
      />
    </div>
  );
}
