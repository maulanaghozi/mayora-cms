import React from "react";
import {
  table_cell,
  column_role,
} from "../TableDetailManualCollection.module.scss";

export default function Created({ row }) {
  return (
    <div className={table_cell + " " + column_role}>
      <span>{row.user && row.user.role ? row.user.role.name : "-"}</span>
    </div>
  );
}
