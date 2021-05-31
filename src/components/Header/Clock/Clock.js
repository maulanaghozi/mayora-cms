import React from "react";
import Clock from "react-live-clock";
import classNames from "classnames";
import { FieldTime } from "../../../assets/icons/index";
import Styles, { container, icon } from "./Clock.module.scss";

export default function Time(props) {
  const { className } = props;
  return (
    <div className={container}>
      <FieldTime className={icon} />
      <Clock
        className={classNames(Styles.clock, className)}
        format={"HH:mm:ss"}
        ticking={true}
        timezone={"Asia/Jakarta"}
      />
    </div>
  );
}
