import React from "react";
import classNames from "classnames";
import moment from "moment";
import { table_cell, column_casting_date, } from "../TalentCastingTable.module.scss"

export default function CastingDate(props) {
  
  const handleShootingDate = (start, end, isOpen, name = "open") => {
    if (isOpen) {
      return name;
    } else if(!start && !end) {
      return `not scheduled yet`
    } else if(typeof start === "number" && typeof end === "number") {
      const shootingDateStart = moment.unix(start).format("DD MMM YYYY");
      const shootingDateEnd = moment.unix(end).format("DD MMM YYYY");
      return `${shootingDateStart} - ${shootingDateEnd}`
    } else {
      return `-`
    }
  }

  const handleExpand = () => {
    if (props.expandRow !== props.index) {
        props.setExpandRow(props.index);
    } else {
        props.setExpandRow(null);
    }
}
  
  return (
    <div 
      className={classNames(table_cell, column_casting_date)}
      onClick={handleExpand}
    >
      <span>
        {handleShootingDate(
          props.row.shooting_date_start,
          props.row.shooting_date_end,
          props.row.shooting_date_tbc
        )}
      </span>
    </div>
  )
}