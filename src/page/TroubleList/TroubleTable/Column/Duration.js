import React from "react";
import {
  table_cell,
  column_duration,
  elipis,
} from "../TroubleTable.module.scss";

export default function Description({ row }) {
  function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds =
      Math.abs(new Date(dateFuture) - new Date(dateNow)) / 1000;

    // calculate minutes
    const minutes = diffInMilliSeconds / 60;

    return `${minutes} Min.`;
  }
  return (
    <div className={table_cell + " " + column_duration}>
      <p className={elipis}>
        {row.endTime ? timeDiffCalc(row.endTime, row.startTime) : "-"}
      </p>
    </div>
  );
}
