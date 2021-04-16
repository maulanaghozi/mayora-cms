import React from "react";
import TargetMenu from "./TargetMenu";
import TargetUser from "./TargetUser";
import Title from "./Title";
import ShortMessage from "./ShortMessage";
import style from "./SendNotifForm.module.scss";

export default function SendNotifForm(props) {
  return (
    <div className={style.container}>
      <span className={style.tagline}>{"NOTIFICATION DETAILS"}</span>
      <TargetMenu
        sendCriteria={props.sendCriteria}
        setSendCriteria={props.setSendCriteria}
      />
      <TargetUser
        sendCriteria={props.sendCriteria}
        setSendCriteria={props.setSendCriteria}
      />
      <Title
        sendCriteria={props.sendCriteria}
        setSendCriteria={props.setSendCriteria}
      />
      <ShortMessage
        sendCriteria={props.sendCriteria}
        setSendCriteria={props.setSendCriteria}
      />
    </div>
  );
}
