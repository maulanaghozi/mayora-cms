import React from "react";
import moment from "moment";
import { table_cell, column_time, elipis } from "../TroubleTable.module.scss";

export default function Title({ row }) {
  return (
    <div className={table_cell + " " + column_time}>
      <div className={elipis}>{`${moment(row.startTime).format("HH:mm")} - ${
        row.endTime ? moment(row.endTime).format("HH:mm") : "Now"
      }`}</div>
    </div>
  );
}
