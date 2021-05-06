import React from "react";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { table_cell, column_detail, detail } from "../Styles.module.scss";

export default function Tag({ row }) {
  const history = useHistory();
  return (
    <div className={classNames(table_cell, column_detail)}>
      <span
        onClick={() =>
          history.push(`/manual-collection/detail/${row.id}/${row.name}`)
        }
        className={detail}
      >
        Detail
      </span>
    </div>
  );
}
