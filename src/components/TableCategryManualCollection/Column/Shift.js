import React from "react";
import { useHistory } from "react-router-dom";
import { EditIcon } from "../../../assets/icons";
import { table_cell, column_shift, notSet } from "../Styles.module.scss";

export default function Description({ row }) {
  const history = useHistory();
  return (
    <div className={table_cell + " " + column_shift}>
      <span className={notSet}>Not Set</span>
      <EditIcon
        onClick={() => history.push(`/manual-collection/edit/${row.id}`)}
      />
    </div>
  );
}
