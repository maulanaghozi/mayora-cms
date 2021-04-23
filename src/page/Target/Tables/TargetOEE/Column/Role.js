import React from "react";
import classNames from "classnames";
import { table_cell, column_role } from "../TargetOEETable.module.scss";

export default function Role(props) {
  return (
    <div className={classNames(table_cell, column_role)}>
      <span>{props.row.role ? props.row.role : "-"}</span>
    </div>
  );
}
