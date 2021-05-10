import React from "react";
import classNames from "classnames";
import { table_cell, column_oee } from "../TableUserManagement.module.scss";

export default function AV(props) {
  return (
    <div className={classNames(table_cell, column_oee)}>
      <span>{props.row.OEE >= 0 ? `${props.row.OEE}%` : "-"}</span>
    </div>
  );
}
