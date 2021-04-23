import React from "react";
import classNames from "classnames";
import { table_cell, column_category } from "../TroubleTable.module.scss";

export default function Tag({ row }) {
  return (
    <div className={classNames(table_cell, column_category)}>
      <span>{row.category ? row.category.name : "not set"}</span>
    </div>
  );
}
