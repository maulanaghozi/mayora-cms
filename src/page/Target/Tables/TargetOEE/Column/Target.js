import React from "react";
import {
  table_cell,
  column_target,
  elipis,
} from "../TargetOEETable.module.scss";

export default function Target({ row }) {
  return (
    <div className={table_cell + " " + column_target}>
      <span className={elipis}>{row.target}</span>
    </div>
  );
}
