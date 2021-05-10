import React from "react";
import classNames from "classnames";
import { table_cell, column_oee } from "../TableUserManagement.module.scss";

export default function AV(props) {
  return (
    <div className={classNames(table_cell, column_oee)}>
      <span>{props.row.AV >= 0 ? `${props.row.AV}%` : "-"}</span>
    </div>
  );
}
