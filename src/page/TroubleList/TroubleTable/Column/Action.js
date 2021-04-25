import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Styles, { table_cell, column_action } from "../TroubleTable.module.scss";

export default function Action({ row }) {
  return (
    <div className={classNames(table_cell, column_action)}>
      <Link className={Styles.edit} to={`/trouble-list/edit/${row.id}`}>
        Edit
      </Link>
    </div>
  );
}
