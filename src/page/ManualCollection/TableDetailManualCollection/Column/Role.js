import React from "react";
import {
  table_cell,
  column_role,
} from "../TableDetailManualCollection.module.scss";

export default function Role({ row }) {
  const hanldeDisplayRole = () => {
    console.log(row);
    if (!row.user) return "";

    let result = row.user.role.name || "";
    if (row.user.roleId === "ROLE-USER-MYR003") {
      const machineNames = [];

      if (row.user.machine1) machineNames.push("Line 1");
      if (row.user.machine2) machineNames.push("Line 2");

      const machineAccess = machineNames.join(",");
      result = result + ` (${machineAccess})`;
    }

    return result;
  };

  return (
    <div className={table_cell + " " + column_role}>
      <span>{row.user && row.user.role ? hanldeDisplayRole() : "-"}</span>
    </div>
  );
}
