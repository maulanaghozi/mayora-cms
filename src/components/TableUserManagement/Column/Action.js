import React from "react";
import classNames from "classnames";
import { table_cell, column_oee } from "../TableUserManagement.module.scss";

export default function Action({ row, setModalEditVisible, setUserEdit }) {
  const handleOnCLick = () => {
    console.log(row);
    setUserEdit(row);
    setModalEditVisible(true);
  };
  return (
    <div className={classNames(table_cell, column_oee)}>
      <span
        onClick={() => handleOnCLick()}
        style={{ cursor: "pointer", color: "#0F74EB", fontFamily: "roboto" }}
      >
        Edit
      </span>
    </div>
  );
}
