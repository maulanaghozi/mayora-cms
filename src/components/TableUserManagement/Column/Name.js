import React from "react";
import moment from "moment";
import {
  table_cell,
  column_oee,
  elipis,
} from "../TableUserManagement.module.scss";

export default function Name({ row }) {
  return (
    <div className={table_cell + " " + column_oee}>
      <div className={elipis}>{row.name}</div>
    </div>
  );
}
