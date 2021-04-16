import React, { useState } from "react";
import classNames from "classnames";

import Number from "./Column/Number";
import SendDate from "./Column/SendDate";
import TargetMenu from "./Column/TargetMenu";
import TargetUser from "./Column/TargetUser";
import Title from "./Column/Title";
import SortableHeader from "../Table/SortableHeader";
import NormalHeader from "../Table/NormalHeader";

import style from "./PushNotifTable.module.scss";

const header = ["Send Date", "Target Menu", "Title", "Target User"];

const headerClasses = [
  style.column_send_date,
  style.column_target_menu,
  style.column_title,
  style.column_target_user,
];

const sortAttributes = ["created_at", null, null, null];

export default function PushNotifTable(props) {
  const [currentSort, setCurrentSort] = useState("Send Date");

  return (
    <div className={style.container}>
      <div className={style.table_header}>
        <div
          className={classNames(
            style.table_cell,
            style.column_number,
            style.header
          )}
        >
          <span>No.</span>
        </div>
        {header.map((head, index) => {
          if (sortAttributes[index]) {
            const sortBy = sortAttributes[index];

            return (
              <SortableHeader
                key={head}
                index={index}
                className={classNames(headerClasses[index], style.table_header)}
                columnName={head}
                handleSort={props.setSearchCriteria}
                sortBy={sortBy}
                currentSort={currentSort}
                setCurrentSort={setCurrentSort}
              />
            );
          } else {
            return (
              <NormalHeader
                key={index}
                index={index}
                className={headerClasses[index]}
                columnName={head}
              />
            );
          }
        })}
      </div>
      <div className={style.table_body}>
        {props.data &&
          props.data.rows.map((row, index, arr) => (
            <div className={style.table_row} key={row.id}>
              <Number index={index} row={row} />
              <SendDate index={index} row={row} />
              <TargetMenu index={index} row={row} />
              <Title row={row} />
              <TargetUser row={row} />
            </div>
          ))}
      </div>
    </div>
  );
}
