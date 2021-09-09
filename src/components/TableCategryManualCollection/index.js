import React from "react";
import classNames from "classnames";

import Category from "./Column/Category";
import Shift from "./Column/Shift";
import Total from "./Column/Total";
import Detail from "./Column/Detail";

import {
  container,
  table_header,
  table_body,
  table_row,
  table_cell,
  column_category,
  column_shift,
  column_detail,
} from "./Styles.module.scss";

const Header = [
  "Category",
  "Value (Shift 1)",
  "Value (Shift 2)",
  "Value (Shift 3)",
  "Total",
  "Detail",
];

const headerClasses = [
  column_category,
  column_shift,
  column_shift,
  column_shift,
  column_shift,
  column_detail,
];

export default function PromoTable(props) {
  return (
    <div className={container}>
      <div className={table_header}>
        {Header.map((head, index) => (
          <NormalHeader key={index} index={index} columnName={head} />
        ))}
      </div>
      <div className={table_body}>
        {props.data &&
          props.data.map((row, index, arr) => {
            if (row.status === "active") {
              return (
                <div className={table_row} key={index}>
                  <Category row={row} />
                  <Shift
                    manualCollection={
                      Array.isArray(row.manualCollections) &&
                      row.manualCollections.find(
                        item => item.shift === "shift1"
                      )
                    }
                    row={row}
                    shift={"shift1"}
                  />
                  <Shift
                    manualCollection={
                      Array.isArray(row.manualCollections) &&
                      row.manualCollections.find(
                        item => item.shift === "shift2"
                      )
                    }
                    row={row}
                    shift={"shift2"}
                  />
                  <Shift
                    manualCollection={
                      Array.isArray(row.manualCollections) &&
                      row.manualCollections.find(
                        item => item.shift === "shift3"
                      )
                    }
                    row={row}
                    shift={"shift3"}
                  />
                  <Total row={row} />
                  <Detail row={row} />
                </div>
              );
            }
          })}
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
