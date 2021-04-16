import React from 'react';
import moment from 'moment';
import { replaceString, capitalize } from '../../../utility/utility';
import style, { table_cell, column_detail } from '../TalentTable.module.scss';
import { ReactComponent as ShrinkIcon } from '../../../assets/shrink.svg';
import { ReactComponent as ExpandIcon } from '../../../assets/expand.svg';

export default function Details(props) {
  const handleAge = dob => {
    let age;

    if(dob) {
      age = moment(dob).fromNow()
    }

    if(age) {
      return replaceString(age, "years ago", "yo" )
    } else {
      return "-"
    }
  }
    
  const handleAgency = agency => {
    if(agency) {
      return `Memiliki Agency`
    } else {
      return `No Agency`
    }
  }

  const handleEthnicity = ethnicity => {
    if(Array.isArray(ethnicity) && ethnicity.length) {
      return `${ethnicity.join(", ")}`
    } else {
      return `-`
    }
  }
    
  const handleSkinColor = skinColor => {
    if(skinColor && typeof skinColor === 'object') {
      return (
        <div className={style.skin_color}>
          <div 
            className={style.hex_color} 
            style={{backgroundColor: skinColor.hex_color}}>
          </div>
          <span className={style.value}>{skinColor.skin_color}</span>
        </div>
      )
    } else {
      return (
        <span className={style.value}>{"-"}</span>
      )
    }
  }
    
  const handleBirthdate = date => {
    if(date) {
      return `${moment(date).format("DD MMM YYYY")}`
    } else {
      return `-`
    }
  }
    
  const handleRecruiterType = type => {
    if(type) {
      return capitalize(type)
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
      className={table_cell + ' ' + column_detail}
      onClick={handleExpand}
    >
      <div className={style.inner_wrapper}>
        <div>{props.row.gender ? capitalize(props.row.gender) : "-"} / {handleAge(props.row.dob)}</div>
        <div>{props.row.height || "-"} cm / {props.row.weight || "-"} kg</div>
        <div>{props.row.hair_type ? capitalize(props.row.hair_type) : "-"}</div>
        <div>{handleSkinColor(props.row.skin_color)}</div>
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