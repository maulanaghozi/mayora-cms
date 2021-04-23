import React from "react";
import classNames from "classnames";
import { table_cell, column_activeTarget } from "../TargetOEETable.module.scss";

export default function ActiveTarget({ row }) {
  return (
    <div className={classNames(table_cell, column_activeTarget)}>
      <span>{row.activeTarget}</span>
    </div>
  );
}
