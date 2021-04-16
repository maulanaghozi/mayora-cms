import React from "react";
import { table_cell, column_number } from "../PushNotifTable.module.scss";
import classNames from "classnames";

export default function Action({ index, row }) {
  return (
    <div className={classNames(table_cell, column_number)}>{index + 1}</div>
  );
}
