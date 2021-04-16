import React from 'react'
import classNames from 'classnames';
import { getProfilePic } from "../../../utility/utility";
import style from '../RecruiterTable.module.scss'

export default function NameId(props) {
  
  const handleExpand = () => {
    if(props.expandRow !== props.index) {
      props.setExpandRow(props.index)
    } else {
      props.setExpandRow(null)
    }
  }

  return (
    <div 
      className={classNames(style.table_cell, style.column_name)}
      onClick={handleExpand}
    >
      <div className={style.image_container}>
        <div
          className={style.profile_pic}
          style={{
            backgroundImage: `url(${getProfilePic(props.row.profile_pic_url)})`
          }}
          alt="profile picture" 
        />
        <div className={classNames(
            style.node,
            {
              [style.green] : props.row.status === "active",
              [style.red] : props.row.status === "blocked",
              [style.yellow] : props.row.status === "unconfirmed"
            }
          )}
        ></div>
      </div>
      
      <div>
        <div className={style.title} style={{ marginBottom: 6 }}>
          {props.row.name}
        </div>
        <div> {props.row.username}</div>
      </div>
    </div>
  )
}