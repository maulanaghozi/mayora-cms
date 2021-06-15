import React from "react";
import { table_cell, column_shift, value } from "../Styles.module.scss";

export default function Total({ row }) {
  const handleValue = () => {
    let total = 0;
    if (
      row &&
      Array.isArray(row.manualCollections) &&
      row.manualCollections.length > 0
    ) {
      row.manualCollections.forEach(el => {
        console.log("[EL]", el);
        total = Number(total) + Number(el.value);
      });
    } else {
      total = null;
    }

    if (total === null) {
      return "-";
    } else {
      return `${total} ${row.unit}`;
    }
  };
  return (
    <div className={table_cell + " " + column_shift}>
      <span className={value}>{handleValue()}</span>
    </div>
  );
}
