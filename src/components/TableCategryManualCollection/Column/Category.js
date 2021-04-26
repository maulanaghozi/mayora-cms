import React from "react";
import { table_cell, column_category, elipis } from "../Styles.module.scss";

export default function Title({ row }) {
  return (
    <div className={table_cell + " " + column_category}>
      <div className={elipis}>{row.name}</div>
    </div>
  );
}
