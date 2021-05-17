import React, { useContext } from "react";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";
import Styles, { table_cell, column_action } from "../TroubleTable.module.scss";
import { Context } from "../../../../hooks/context";

export default function Action({ row }) {
  const history = useHistory();
  const globalState = useContext(Context);
  const { setFromPage, adminProfile } = globalState;

  return (
    <div className={classNames(table_cell, column_action)}>
      <div
        className={classNames(Styles.edit, {
          [Styles.disabled]:
            adminProfile &&
            adminProfile.roleId === "ROLE-USER-MYR003" &&
            row.user,
        })}
        onClick={() => {
          setFromPage("editTrouble");
          history.push(`/trouble-list/edit/${row.id}`);
        }}
      >
        Edit
      </div>
    </div>
  );
}
