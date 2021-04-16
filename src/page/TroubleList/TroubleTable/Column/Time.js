import React from "react";
import { table_cell, column_time, elipis } from "../TroubleTable.module.scss";

export default function Title({ row }) {
  return (
    <div className={table_cell + " " + column_time}>
      <div className={elipis}>{row.startTime}</div>
      <span>{` - `}</span>
      <div className={elipis}>{row.endTime}</div>
    </div>
  );
}
