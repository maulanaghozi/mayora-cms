import React from "react";
import classNames from "classnames";
import Styles, { table_cell, column_action } from "../TroubleTable.module.scss";

export default function Action(props) {
  return (
    <div className={classNames(table_cell, column_action)}>
      <span className={Styles.edit}>Edit</span>
    </div>
  );
}
