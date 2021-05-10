import React from "react";
import { table_cell, column_oee } from "../TableUserManagement.module.scss";

export default function Target({ target }) {
  return (
    <div className={table_cell + " " + column_oee}>
      <span>{`${target}%`}</span>
    </div>
  );
}
