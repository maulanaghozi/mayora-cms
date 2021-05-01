import React from "react";
import {
  table_cell,
  column_remark,
  notSet,
} from "../TableDetailManualCollection.module.scss";

export default function Remark({ row }) {
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
