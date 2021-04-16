import React from "react";
import classNames from "classnames";
import style, { table_cell, column_title } from "../TalentCastingTable.module.scss"

export default function Title(props) {
  const handleExpand = () => {
    if (props.expandRow !== props.index) {
      props.setExpandRow(props.index);
    } else {
      props.setExpandRow(null);
    }
  }

  return (
    <div 
      className={classNames(table_cell, column_title)}
      onClick={handleExpand}
    >
      <span 
        className={style.title}
      >
          {props.row.title ? props.row.title : "-"}
      </span>
    </div>
  )
}