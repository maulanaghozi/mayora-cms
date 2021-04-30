import React from "react";
import moment from "moment";
import classNames from "classnames";
import {
  table_cell,
  column_activeTarget,
} from "../ProductionTargetTable.module.scss";

export default function ActiveTarget({ row }) {
  return (
    <div className={classNames(table_cell, column_activeTarget)}>
      <span>{moment(row.activeTarget).format("HH:mm")}</span>
    </div>
  );
}
