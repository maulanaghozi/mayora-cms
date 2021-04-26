import React from "react";
import { EditIcon } from "../../../assets/icons";
import { table_cell, column_shift, notSet } from "../styles.module.scss";

export default function Description({ row }) {
  return (
    <div className={table_cell + " " + column_shift}>
      <span className={notSet}>Not Set</span>
      <EditIcon />
    </div>
  );
}
