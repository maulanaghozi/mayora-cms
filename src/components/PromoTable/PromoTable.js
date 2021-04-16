import React, { useState } from "react";
import classNames from "classnames";
import { ReactComponent as SortIcon } from "../../assets/chevron_down_blue.svg";

import Number from "./Column/Number";
import Title from "./Column/Title";
import Description from "./Column/Description";
import Tag from "./Column/Tag";
import Image from "./Column/Image";
import Publish from "./Column/Publish";
import Created from "./Column/Created";
import Status from "./Column/Status";
import Action from "./Column/Action";

import {
  container,
  table_header,
  table_body,
  table_row,
  table_cell,
  column_number,
  column_title,
  column_description,
  column_tag,
  column_image,
  column_publish,
  column_created,
  column_status,
  column_action,
  blue_header,
  cursor_pointer,
} from "./PromoTable.module.scss";

const Header = [
  "Title",
  "Description",
  "Tag",
  "Image",
  "Publish Date",
  "Created Date",
  "Status",
  "Action",
];

const headerClasses = [
  column_title,
  column_description,
  column_tag,
  column_image,
  column_publish,
  column_created,
  column_status,
  column_action,
];

const sortAttributes = [
  "title",
  null,
  null,
  null,
  "published_at",
  "created_at",
  "status",
  null,
];

export default function PromoTable(props) {
  const [openMore, setOpenMore] = useState(false);
  const [currentSort, setCurrentSort] = useState("Title");

  return (
    <div className={container}>
      <div className={table_header}>
        <div className={classNames(table_cell, column_number)}>
          <div>
            <span>No </span>
          </div>
        </div>
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
              <Number index={index} row={row} />
              <Title row={row} />
              <Description row={row} />
              <Tag row={row} />
              <Image row={row} />
              <Publish row={row} />
              <Created row={row} />
              <Status row={row} />
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
