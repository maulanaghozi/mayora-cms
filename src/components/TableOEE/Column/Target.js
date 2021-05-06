import React from "react";
import { table_cell, column_target, elipis } from "../TableOEE.module.scss";

export default function Target({ row }) {
  return (
    <div className={table_cell + " " + column_target}>
      <p className={elipis}>{row.target}</p>
    </div>
  );
}
