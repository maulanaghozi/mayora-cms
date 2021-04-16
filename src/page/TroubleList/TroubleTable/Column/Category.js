import React from "react";
import { table_cell, column_category } from "../TroubleTable.module.scss";

export default function Tag({ row }) {
  return (
    <div className={table_cell + " " + column_category}>
      <span>{row.category}</span>
    </div>
  );
}
