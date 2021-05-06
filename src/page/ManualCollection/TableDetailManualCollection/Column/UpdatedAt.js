import React from "react";
import moment from "moment";
import {
  table_cell,
  column_updatedAt,
} from "../TableDetailManualCollection.module.scss";

export default function UpdatedAt({ row }) {
  return (
    <div className={table_cell + " " + column_updatedAt}>
      <div>{moment(row.updatedAt).format("DD MMM YYYY HH:mm")}</div>
    </div>
  );
}
