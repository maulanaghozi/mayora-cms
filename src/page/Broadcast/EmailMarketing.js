import React from "react";
import useHeader from "../../hooks/useHeader/useHeader";
import style from "./Broadcast.module.scss";

export default function EmailMarketing(props) {
  useHeader({
    title: ["Broadcast", "Email Marketing"],
    path: ["/broadcast/push-email", "/broadcast/email"],
  });
  return <div className={style.email_container}></div>;
}
