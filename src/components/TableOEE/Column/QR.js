import React from "react";
import classNames from "classnames";
import { table_cell, column_oee } from "../TableOEE.module.scss";

export default function AV(props) {
  return (
    <div className={classNames(table_cell, column_oee)}>
      <span>{props.row.QR ? `${props.row.QR}%` : "-"}</span>
    </div>
  );
}
