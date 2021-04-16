import React from "react";
import { table_cell, column_target_user } from "../PushNotifTable.module.scss";
import classNames from "classnames";

export default function TargetUser(props) {
  return (
    <div className={classNames(table_cell, column_target_user)}>
      <span>{props.row.target_type}</span>
    </div>
  );
}
