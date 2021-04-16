import React from "react";
import classNames from "classnames";
import { table_cell, column_thumbnail } from "../TalentCastingTable.module.scss"

export default function Thumbnail(props) {
  const handleExpand = () => {
    if (props.expandRow !== props.index) {
      props.setExpandRow(props.index);
    } else {
      props.setExpandRow(null);
    }
  }
  
  return (
    <div 
      className={classNames(table_cell, column_thumbnail)}
      onClick={handleExpand}
    >
      {props.row.thumbnail ? 
      <img
        src={props.row.thumbnail.thumbnail_url}
      /> :
      <span>{'thumbnail is not uploaded yet'}</span>
    }
    </div>
  )
}