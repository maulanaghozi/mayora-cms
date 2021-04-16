import React from "react";
import { table_cell, column_remark } from "../TroubleTable.module.scss";

export default function Image({ row }) {
  return (
    <div className={table_cell + " " + column_remark}>
      {row.remark ? <span>{row.remark}</span> : <span>not set</span>}
    </div>
  );
}
