import React from "react";
import { table_cell, column_name } from "../ProductionTargetTable.module.scss";

export default function Name({ row }) {
  return (
    <div className={table_cell + " " + column_name}>
      {row.name ? row.name : "System"}
    </div>
  );
}
