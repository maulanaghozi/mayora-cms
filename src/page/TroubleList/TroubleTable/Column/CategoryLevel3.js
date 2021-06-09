import React from "react";
import classNames from "classnames";
import {
  table_cell,
  column_category,
  dotRed,
  categoryWrapper,
} from "../TroubleTable.module.scss";

export default function CategoryLevel3({ row }) {
  const handleValue = () => {
    if (!row.category) return "not set";
    if (!row.category.parent) return "not set";
    if (!row.category.parent.parent) return "not set";

    return row.category.parent.parent.name;
  };
  return (
    <div className={classNames(table_cell, column_category)}>
      <div className={categoryWrapper}>
        <span>{row.category ? handleValue() : "not set"}</span>
      </div>
    </div>
  );
}
