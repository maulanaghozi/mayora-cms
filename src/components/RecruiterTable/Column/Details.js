import React from "react";
import classNames from "classnames";
import { capitalize } from "../../../utility/utility";
import style from "../RecruiterTable.module.scss";
import { ReactComponent as ShrinkIcon } from '../../../assets/shrink.svg';
import { ReactComponent as ExpandIcon } from '../../../assets/expand.svg';

export default function Details(props) {

  const handleExpand = () => {
    if (props.expandRow !== props.index) {
      props.setExpandRow(props.index);
    } else {
      props.setExpandRow(null);
    }
  }

  return (
    <div 
      className={classNames(style.table_cell, style.column_detail)}
      onClick={handleExpand}
    >
      <div className={style.inner_wrapper}>
        <div>{props.row.recruiter_type ? capitalize(props.row.recruiter_type) : "-"}</div>
      </div>
      <div className={style.expand_shrink_icon_wrapper}>
        {
          (props.expandRow === props.index) ?
          <ShrinkIcon /> :
          <ExpandIcon />
        }
      </div>
    </div>
  )
}