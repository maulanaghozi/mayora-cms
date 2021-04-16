import React from "react";
import classNames from "classnames";
import { getCastingType } from "../../../utility/utility";
import { table_cell, column_type } from "../TalentCastingTable.module.scss"

export default function Type(props) {
  const handleExpand = () => {
    if (props.expandRow !== props.index) {
      props.setExpandRow(props.index);
    } else {
      props.setExpandRow(null);
    }
  }
  
  return (
    <div 
      className={classNames(table_cell, column_type)}
      onClick={handleExpand}
    >
      <span>
        {props.row.type ? getCastingType(props.row.type) : "-"}
      </span>
      <span>
        {props.row.production_type ? props.row.production_type : "-"}
      </span>
    </div>
  )
}