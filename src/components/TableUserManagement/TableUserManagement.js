import React from "react";
import classNames from "classnames";

import Name from "./Column/Name";
import Email from "./Column/Email";
import Role from "./Column/Role";
import Status from "./Column/Status";
import Action from "./Column/Action";

import {
  container,
  table_header,
  table_body,
  table_row,
  table_cell,
  column_oee,
} from "./TableUserManagement.module.scss";

const Header = ["Name", "Username", "Role", "Status", "Action"];

const headerClasses = [
  column_oee,
  column_oee,
  column_oee,
  column_oee,
  column_oee,
];

export default function TableOEE(props) {
  const { setModalEditVisible, setUserEdit } = props;
  return (
    <div className={container}>
      <div className={table_header}>
        {Header.map((head, index) => (
          <NormalHeader key={index} index={index} columnName={head} />
        ))}
      </div>
      <div className={table_body}>
        {props.data &&
          props.data.map((row, index) => (
            <div className={table_row} key={index}>
              <Name row={row} />
              <Email row={row} />
              <Role row={row} />
              <Status row={row} />
              <Action
                row={row}
                setModalEditVisible={setModalEditVisible}
                setUserEdit={setUserEdit}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

const NormalHeader = props => {
  return (
    <div className={classNames(table_cell, headerClasses[props.index])}>
      <span>{props.columnName}</span>
    </div>
  );
};
