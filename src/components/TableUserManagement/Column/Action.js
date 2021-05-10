import React from "react";
import classNames from "classnames";
import { table_cell, column_oee } from "../TableUserManagement.module.scss";

export default function Action(props) {
  return (
    <div className={classNames(table_cell, column_oee)}>
      <span>{props.row.PE >= 0 ? `${props.row.PE}%` : "-"}</span>
    </div>
  );
}
