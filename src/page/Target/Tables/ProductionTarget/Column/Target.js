import React from "react";
import {
  table_cell,
  column_target,
  elipis,
} from "../ProductionTargetTable.module.scss";
import { currencyFormater } from "../../../../../utility/utility";

export default function Target({ row }) {
  return (
    <div className={table_cell + " " + column_target}>
      <span className={elipis}>{currencyFormater(row.target)}</span>
    </div>
  );
}
