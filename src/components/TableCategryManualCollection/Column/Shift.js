import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { EditIcon } from "../../../assets/icons";
import { table_cell, column_shift, notSet, value } from "../Styles.module.scss";
import { Context } from "../../../hooks/context";

export default function Description({ manualCollection, row, shift }) {
  const globalState = useContext(Context);
  const { setManualCollection, adminProfile } = globalState;
  const history = useHistory();

  const handleValue = () => {
    if (manualCollection && manualCollection.value) {
      return manualCollection.value;
    } else {
      return "";
    }
  };
  return (
    <div className={table_cell + " " + column_shift}>
      {manualCollection && manualCollection.value ? (
        <span
          className={value}
        >{`${manualCollection.value} ${manualCollection.unit}`}</span>
      ) : (
        <span className={notSet}>Not Set</span>
      )}

      {adminProfile &&
      adminProfile.roleId === "ROLE-USER-MYR003" &&
      manualCollection &&
      manualCollection.value ? (
        <div />
      ) : (
        <EditIcon
          onClick={() => {
            setManualCollection({
              categoryId: row.id,
              categoryName: row.name,
              value: handleValue(),
              shift: shift,
              remark: "",
              unit: row.unit,
            });
            history.push(`/manual-collection/edit/${row.id}`);
          }}
        />
      )}
    </div>
  );
}
