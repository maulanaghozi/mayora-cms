import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { EditIcon } from "../../../assets/icons";
import { table_cell, column_shift, notSet } from "../Styles.module.scss";
import { Context } from "../../../hooks/context";

export default function Description({ row, shift }) {
  const globalState = useContext(Context);
  const { setManualCollection } = globalState;
  const history = useHistory();
  return (
    <div className={table_cell + " " + column_shift}>
      <span className={notSet}>Not Set</span>
      <EditIcon
        onClick={() => {
          setManualCollection({
            categoryId: row.id,
            categoryName: row.name,
            value: "",
            shift: shift,
            remark: "",
            unit: row.unit,
          });
          history.push(`/manual-collection/edit/${row.id}`);
        }}
      />
    </div>
  );
}
