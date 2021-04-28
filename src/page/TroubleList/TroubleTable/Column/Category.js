import React from "react";
import classNames from "classnames";
import {
  table_cell,
  column_category,
  dotRed,
  categoryWrapper,
} from "../TroubleTable.module.scss";

export default function Tag({ row }) {
  return (
    <div className={classNames(table_cell, column_category)}>
      <div className={categoryWrapper}>
        <span>{row.category ? row.category.name : "not set"}</span>
        {row.updatedBy === null && <div className={dotRed}></div>}
      </div>
    </div>
  );
}
