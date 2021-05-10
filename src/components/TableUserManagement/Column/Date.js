import React from "react";
import moment from "moment";
import {
  table_cell,
  column_oee,
  elipis,
} from "../TableUserManagement.module.scss";

export default function Title({ row }) {
  return (
    <div className={table_cell + " " + column_oee}>
      <div className={elipis}>{moment(row.Date).format("DD MMM")}</div>
    </div>
  );
}
