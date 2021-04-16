import React from "react";
import {
  table_cell,
  column_duration,
  elipis,
} from "../TroubleTable.module.scss";

export default function Description({ row }) {
  return (
    <div className={table_cell + " " + column_duration}>
      <p className={elipis}>{row.duration}</p>
    </div>
  );
}
