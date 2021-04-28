import React from "react";
import { table_cell, column_remark, notSet } from "../TroubleTable.module.scss";

export default function Image({ row }) {
  return (
    <div className={table_cell + " " + column_remark}>
      {row.remark ? (
        <span>{row.remark}</span>
      ) : (
        <span className={notSet}>Not set</span>
      )}
    </div>
  );
}
