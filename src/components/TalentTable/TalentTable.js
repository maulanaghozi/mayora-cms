// Packages
import React, { useState } from 'react';

// Components
import NameId from './Column/NameId';
import LocationEmail from './Column/LocationEmail';
import Details from './Column/Details';
import Created from './Column/Created';
import StaffPick from './Column/StaffPick';
import Status from './Column/Status';
import Action from './Column/Action';
import ExpandRow from './ExpandRow/ExpandRow';
import NormalHeader from '../Table/NormalHeader';
import SortableHeader from '../Table/SortableHeader';

import style from './TalentTable.module.scss'

const header = [
  'Name / Username',
  'Location / Email / Phone',
  'Details',
  'Created Date',
  'Staff Pick',
  // 'Status',
  'Action'
]

const headerClasses = [
  style.column_name,
  style.column_location,
  style.column_detail,
  style.column_created,
  style.column_staff_pick,
  // style.column_status,
  style.column_action,
]

const sortAttributes = [
  'name',
  null,
  null,
  'created_at',
  null,
  // null,
  null
]

export default function TalentTable(props) {
  const [openRow, setOpenRow] = useState(null);
  const [expandRow, setExpandRow] = useState(null);
  const [currentSort, setCurrentSort] = useState('name');

  return (
    <div className={style.table_container}>
      <div className={style.table_header}>
        {header.map((head, index) => {
          if(sortAttributes[index]) {
            const sortBy = sortAttributes[index];

            return (
              <SortableHeader
                key={head}
                index={index}
                className={headerClasses[index]}
                columnName={head}
                handleSort={props.setSearchCriteria}
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
        {Array.isArray(props.data) && props.data.map((row, index, arr) => (
          <div className={style.table_row} key={index}>
            <div 
              className={style.table_row_child}
              key={row.casting_id}
            >
              <NameId 
                row={row}
                index={index}
                expandRow={expandRow}
                setExpandRow={setExpandRow}
              />
              <LocationEmail 
                row={row} 
                index={index}
                expandRow={expandRow}
                setExpandRow={setExpandRow}
              />
              <Details 
                row={row}
                index={index}
                expandRow={expandRow}
                setExpandRow={setExpandRow}
              />
              <Created 
                row={row} 
                index={index}
                expandRow={expandRow}
                setExpandRow={setExpandRow}
              />
              <StaffPick 
                row={row} 
                index={index}
                expandRow={expandRow}
                setExpandRow={setExpandRow}
                setSessionId={props.setSessionId}
              />
              {/* <Status 
                row={row} 
                index={index}
                expandRow={expandRow}
                setExpandRow={setExpandRow}
              /> */}
              <Action 
                row={row} 
                index={index}
                openRow={openRow}
                setOpenRow={setOpenRow}
                totalRow={arr.length}
                expandRow={expandRow}
                setExpandRow={setExpandRow}
                setSessionId={props.setSessionId}
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
          <h2 className={style.table_empty}>There is no Talent</h2>
        }
      </div>
    </div>
  )
}