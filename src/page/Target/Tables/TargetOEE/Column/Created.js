import React from "react";
import moment from "moment";
import { table_cell, column_updated } from "../TroubleTable.module.scss";

export default function Created({ row }) {
  return (
    <div className={table_cell + " " + column_updated}>
      <div>{moment(row.updatedAt).format("DD MMM YYYY HH:mm")}</div>
    </div>
  );
}
