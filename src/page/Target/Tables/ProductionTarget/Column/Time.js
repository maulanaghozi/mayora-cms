import React from "react";
import moment from "moment";
import {
  table_cell,
  column_time,
  elipis,
} from "../ProductionTargetTable.module.scss";

export default function Title({ row }) {
  return (
    <div className={table_cell + " " + column_time}>
      <div className={elipis}>
        {moment(row.updatedAt).format("DD MM YYYY HH:mm")}
      </div>
    </div>
  );
}
