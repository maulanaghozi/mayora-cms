import React from "react";
import classNames from "classnames";
import { table_cell, column_oee } from "../TableUserManagement.module.scss";

export default function Role(props) {
  const hanldeDisplayRole = () => {
    let result = props.row.role.name;
    if (props.row.roleId === "ROLE-USER-MYR003") {
      const machineNames = [];

      if (props.row.machine1) machineNames.push("Line 1");
      if (props.row.machine2) machineNames.push("Line 2");

      const machineAccess = machineNames.join(",");
      result = result + ` (${machineAccess})`;
    }

    return result;
  };
  return (
    <div className={classNames(table_cell, column_oee)}>
      <span style={{ textTransform: "capitalize" }}>{hanldeDisplayRole()}</span>
    </div>
  );
}
