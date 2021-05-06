import React from "react";
import {
  table_cell,
  column_shift,
} from "../TableDetailManualCollection.module.scss";

export default function Shift({ row }) {
  return (
    <div className={table_cell + " " + column_shift}>
      <span>{row.shift}</span>
    </div>
  );
}
