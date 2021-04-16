// Packages
import React, { useState } from "react";
import classNames from "classnames";

// Components
import Number from "./Column/Number";
import Recruiter from "./Column/Recruiter";
import Title from "./Column/Title";
import CastingType from "./Column/Type";
import Thumbnail from "./Column/Thumbnail";
import CastingDate from "./Column/CastingDate";
import Status from "./Column/Status";
import NormalHeader from "../Table/NormalHeader";
import SortableHeader from "../Table/SortableHeader";
import ExpandRow from "./ExpandRow/ExpandRow";

// Style
import style from "./TalentCastingTable.module.scss"

const header = [
  "Recruiter",
  "Title",
  "Type",
  "Thumbnail",
  "Casting Date",
  "Application Status"
]

const headerClasses = [
  style.column_recruiter,
  style.column_title,
  style.column_type,
  style.column_thumbnail,
  style.column_casting_date,
  style.column_status
]

const sortAttributes = [
  null,
  'title',
  null,
  null,
  null,
  null
]

export default function TalentCastingTable(props) {
  const [expandRow, setExpandRow] = useState(null);
  const [currentSort, setCurrentSort] = useState("updated_at");

  return (
    <div className={style.table_container}>
      <div className={style.table_header}>
        <div 
          className={classNames(
            style.table_cell, 
            style.column_number,
            style.header
          )}
        >
          <span>No. </span>
        </div>
        {header.map((head, index) => {
          if(sortAttributes[index]) {
            const sortBy = sortAttributes[index];

            return (
              <SortableHeader
                key={head}
                index={index}
                className={headerClasses[index]}
                columnName={head}
                handleSort={props.handleSearchCriteriaChange}
                sortBy={sortBy}
                currentSort={currentSort}
                setCurrentSort={setCurrentSort}
              />
            )
          } else {
            return (
              <NormalHeader
                key={index}
                index={index}
                className={headerClasses[index]}
                columnName={head}
              />
            )
          }
        })}
      </div>
        <div className={style.table_body}>
          {Array.isArray(props.data) && props.data.map((row, index) => (
            <div className={style.table_row} key={index}>
              <div 
                className={style.table_row_child}
                key={row.casting_id}
              >
                <Number 
                  row={row} 
                  index={index}
                  expandRow={expandRow}
                  setExpandRow={setExpandRow}
                />
                <Recruiter 
                  index={index}
                  row={row}
                  expandRow={expandRow}
                  setExpandRow={setExpandRow}
                />
                <Title 
                  index={index}
                  row={row} 
                  expandRow={expandRow}
                  setExpandRow={setExpandRow}
                />
                <CastingType 
                  row={row} 
                  index={index} 
                  expandRow={expandRow}
                  setExpandRow={setExpandRow}             
                />
                <Thumbnail 
                  row={row} 
                  index={index}
                  expandRow={expandRow}
                  setExpandRow={setExpandRow}
                />
                <CastingDate 
                  row={row}
                  index={index}
                  expandRow={expandRow}
                  setExpandRow={setExpandRow}
                />
                <Status 
                  row={row}
                  index={index}
                  expandRow={expandRow}
                  setExpandRow={setExpandRow}
                />
              </div>
              {expandRow === index &&
                <ExpandRow
                  row={row}
                  index={index}
                  expandRow={expandRow}
                  setExpandRow={setExpandRow}
                />
              }
            </div>
          ))}
          {Array.isArray(props.data) && props.data.length === 0 && 
            <h2 className={style.table_empty}>No casting applied</h2>
          }
        </div>
    </div>
  )
}