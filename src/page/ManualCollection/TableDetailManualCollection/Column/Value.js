import React from "react";
import classNames from "classnames";
import {
  table_cell,
  column_value,
} from "../TableDetailManualCollection.module.scss";

export default function Value({ row }) {
  return (
    <div className={classNames(table_cell, column_value)}>
      <span>{`${row.value} ${row.unit}`}</span>
    </div>
  );
}
