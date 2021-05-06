import React from "react";
import classNames from "classnames";

import UpdatedAt from "./Column/UpdatedAt";
import Shift from "./Column/Shift";
import Value from "./Column/Value";
import Remark from "./Column/Remark";
import Name from "./Column/Name";
import Role from "./Column/Role";

import {
  container,
  table_header,
  table_body,
  table_row,
  table_cell,
  column_updatedAt,
  column_shift,
  column_value,
  column_remark,
  column_name,
  column_role,
} from "./TableDetailManualCollection.module.scss";

const Header = ["Updated at", "Shift", "Value", "Remark", "Name", "Role"];

const headerClasses = [
  column_updatedAt,
  column_shift,
  column_value,
  column_remark,
  column_name,
  column_role,
];

export default function ManualCollectionTable(props) {
  return (
    <div className={container}>
      <div className={table_header}>
        {Header.map((head, index) => (
          <NormalHeader key={index} index={index} columnName={head} />
        ))}
      </div>
      <div className={table_body}>
        {props.data &&
          props.data.map((row, index, arr) => (
            <div className={table_row} key={index}>
              <UpdatedAt row={row} />
              <Shift row={row} />
              <Value row={row} />
              <Remark row={row} />
              <Name row={row} />
              <Role row={row} />
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
