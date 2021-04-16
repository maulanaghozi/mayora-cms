import React, { useState } from "react";
import classNames from "classnames";
import { ReactComponent as SortIcon } from "../../../assets/chevron_down_blue.svg";

import Time from "./Column/Time";
import Duration from "./Column/Duration";
import Category from "./Column/Category";
import Remark from "./Column/Remark";
import Name from "./Column/Name";
import Created from "./Column/Created";
import Action from "./Column/Action";

import {
  container,
  table_header,
  table_body,
  table_row,
  table_cell,
  column_time,
  column_duration,
  column_category,
  column_remark,
  column_name,
  column_updated,
  column_action,
  blue_header,
  cursor_pointer,
} from "./TroubleTable.module.scss";

const Header = [
  "Time",
  "Duration",
  "Category",
  "Remark",
  "Name",
  "Updated at",
  "Action",
];

const headerClasses = [
  column_time,
  column_duration,
  column_category,
  column_remark,
  column_name,
  column_updated,
  column_action,
];

const sortAttributes = ["time", null, null, null, null, null, null];

export default function PromoTable(props) {
  const [openMore, setOpenMore] = useState(false);
  const [currentSort, setCurrentSort] = useState("Time");

  return (
    <div className={container}>
      <div className={table_header}>
        {Header.map((head, index) => {
          if (sortAttributes[index]) {
            const sortBy = sortAttributes[index];

            return (
              <SortableHeader
                key={index}
                index={index}
                columnName={head}
                handleSort={props.onChange}
                sortBy={sortBy}
                currentSort={currentSort}
                setCurrentSort={setCurrentSort}
              />
            );
          } else {
            return <NormalHeader key={index} index={index} columnName={head} />;
          }
        })}
      </div>
      <div className={table_body}>
        {props.data &&
          props.data.map((row, index, arr) => (
            <div className={table_row} key={index}>
              <Time row={row} />
              <Duration row={row} />
              <Category row={row} />
              <Remark row={row} />
              <Name row={row} />
              <Created row={row} />
              <Action
                row={row}
                index={index}
                openRow={openMore}
                setOpenRow={setOpenMore}
                setKey={props.setKey}
                totalRow={arr.length}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

const SortableHeader = props => {
  const [order, setOrder] = useState("ASC");

  const handleSort = () => {
    let newOrder = "ASC";

    if (isAscending()) {
      newOrder = "DESC";
    }

    setOrder(newOrder);

    props.setCurrentSort(props.columnName);

    props.handleSort({
      sortBy: props.sortBy,
      order: newOrder,
    });
  };

  const isAscending = () => {
    return order === "ASC";
  };

  return (
    <div
      onClick={handleSort}
      className={classNames(
        table_cell,
        headerClasses[props.index],
        { [blue_header]: props.currentSort === props.columnName },
        cursor_pointer,
        props.className
      )}
    >
      <span>{props.columnName}</span>
      <SortIcon transform={"scale(1," + (isAscending() ? "1)" : "-1)")} />
    </div>
  );
};

const NormalHeader = props => {
  return (
    <div className={classNames(table_cell, headerClasses[props.index])}>
      <span>{props.columnName}</span>
    </div>
  );
};
