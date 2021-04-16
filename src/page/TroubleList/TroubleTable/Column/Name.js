import React from "react";
import { table_cell, column_name } from "../TroubleTable.module.scss";

export default function Publish(props) {
  return (
    <div className={table_cell + " " + column_name}>
      <span>{props.row.name}</span>
    </div>
  );
}
