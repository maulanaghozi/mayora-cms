import React from "react";
import classNames from "classnames";

import style from "../PushNotifTable.module.scss";

export default function Title({ row }) {
  return (
    <div className={classNames(style.table_cell, style.column_title)}>
      <span>{row.title}</span>
    </div>
  );
}
