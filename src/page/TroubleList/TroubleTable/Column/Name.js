import React from "react";
import classNames from "classnames";
import { table_cell, column_name } from "../TroubleTable.module.scss";

export default function Publish(props) {
  return (
    <div className={classNames(table_cell, column_name)}>
      <span>{props.row.updatedBy ? props.row.updatedBy : "System"}</span>
    </div>
  );
}
