import React from "react";
import classNames from "classnames";

import Date from "./Column/Date";
import Target from "./Column/Target";
import OEE from "./Column/OEE";
import AV from "./Column/AV";
import PE from "./Column/PE";
import QR from "./Column/AV";

import {
  container,
  table_header,
  table_body,
  table_row,
  table_cell,
  column_oee,
} from "./TableOEE.module.scss";

const Header = ["Date", "Target", "OEE", "AV", "PE", "QR"];

const headerClasses = [
  column_oee,
  column_oee,
  column_oee,
  column_oee,
  column_oee,
  column_oee,
];

export default function ProductionTargetTable(props) {
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
              <Date row={row} />
              <Target row={row} />
              <OEE row={row} />
              <AV row={row} />
              <PE row={row} />
              <QR row={row} />
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
