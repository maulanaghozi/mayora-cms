import React from "react";
import { table_cell, column_oee } from "../TableUserManagement.module.scss";

export default function Email({ row }) {
  return (
    <div className={table_cell + " " + column_oee}>
      <span>{row.email}</span>
    </div>
  );
}
