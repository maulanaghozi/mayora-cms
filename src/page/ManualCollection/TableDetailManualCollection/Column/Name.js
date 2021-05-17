import React from "react";
import classNames from "classnames";
import {
  table_cell,
  column_name,
} from "../TableDetailManualCollection.module.scss";

export default function Publish(props) {
  return (
    <div className={classNames(table_cell, column_name)}>
      <span>{props.row.user ? props.row.user.name : "System"}</span>
    </div>
  );
}
