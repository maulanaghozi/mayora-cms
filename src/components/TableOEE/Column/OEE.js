import React from "react";
import classNames from "classnames";
import { table_cell, column_oee } from "../TableOEE.module.scss";

export default function OEE(props) {
  const colorOEE = status => {
    switch (status) {
      case true:
        return "#0AC46B";
      case false:
        return "#E92548";
      default:
        return "#212121";
    }
  };

  return (
    <div className={classNames(table_cell, column_oee)}>
      <span
        style={{
          color: colorOEE(Number(props.target) <= Number(props.row.OEE)),
        }}
      >
        {props.row.OEE >= 0 ? `${props.row.OEE}%` : "-"}
      </span>
    </div>
  );
}
