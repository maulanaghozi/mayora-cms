import React from "react";
import classNames from "classnames";
import { getProfilePic } from "../../../utility/utility";
import style, { table_cell, column_recruiter } from "../TalentCastingTable.module.scss"

export default function Recruiter(props) {
  const handleExpand = () => {
    if (props.expandRow !== props.index) {
      props.setExpandRow(props.index);
    } else {
      props.setExpandRow(null);
    }
  }

  return (
    <div 
      className={classNames(table_cell, column_recruiter)}
      onClick={handleExpand}
    >
      {props.row.recruiter ?
        <>
          <div className={style.picture_container}>
            <img 
              className={style.profile_picture} 
              src={getProfilePic(props.row.recruiter.profile_pic_url)} 
            />
          </div>
          <span>{props.row.recruiter.name}</span>
        </>
        :
        '-'
      }
    </div>
  )
}