import React from "react";
import moment from "moment";
import { table_cell, column_time, elipis } from "../TargetOEETable.module.scss";

export default function Title({ row }) {
  return (
    <div className={table_cell + " " + column_time}>
      <div className={elipis}>
        {moment(row.time).format("DD MMM YYYY HH:mm")}
      </div>
    </div>
  );
}
