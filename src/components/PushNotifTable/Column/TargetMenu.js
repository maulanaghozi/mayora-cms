import React from "react";
import { table_cell, column_target_menu } from "../PushNotifTable.module.scss";
import TextBoxEllipsis from "../../TextBoxEllipsis/TextBoxEllipsis";
import classNames from "classnames";

export default function TargetMenu(props) {
  return (
    <div className={classNames(table_cell, column_target_menu)}>
      <span>{props.row.target_menu}</span>
    </div>
  );
}
