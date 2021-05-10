import React from "react";
import classNames from "classnames";
import { table_cell, column_oee } from "../TableUserManagement.module.scss";

export default function Role(props) {
  return (
    <div className={classNames(table_cell, column_oee)}>
      <span>{props.row.role}</span>
    </div>
  );
}
