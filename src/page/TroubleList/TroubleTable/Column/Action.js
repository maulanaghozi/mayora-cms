import React from "react";
import classNames from "classnames";
import { table_cell, column_action } from "../TroubleTable.module.scss";

export default function Action(props) {
  return (
    <div className={classNames(table_cell, column_action)}>
      <span>Edit</span>
    </div>
  );
}
