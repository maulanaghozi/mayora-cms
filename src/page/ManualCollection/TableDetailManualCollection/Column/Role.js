import React from "react";
import {
  table_cell,
  column_role,
} from "../TableDetailManualCollection.module.scss";

export default function Created({ row }) {
  return (
    <div className={table_cell + " " + column_role}>
      <span>{row.updatedBy ? "Supervisor" : "-"}</span>
    </div>
  );
}
