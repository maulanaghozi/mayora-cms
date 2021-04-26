import React from "react";
import classNames from "classnames";
import { table_cell, column_detail, detail } from "../Styles.module.scss";

export default function Tag({ row }) {
  return (
    <div className={classNames(table_cell, column_detail)}>
      <span className={detail}>Detail</span>
    </div>
  );
}
