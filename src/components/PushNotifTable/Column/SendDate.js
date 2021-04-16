import React from "react";
import moment from "moment";
import style, {
  table_cell,
  column_send_date,
} from "../PushNotifTable.module.scss";
import classNames from "classnames";

export default function SendDate(props) {
  return (
    <div className={classNames(table_cell, column_send_date)}>
      <div>{moment.unix(props.row.created_at).format("DD MMM YYYY")}</div>
      <div>{moment.unix(props.row.created_at).format("HH:mm:ss")}</div>
    </div>
  );
}
