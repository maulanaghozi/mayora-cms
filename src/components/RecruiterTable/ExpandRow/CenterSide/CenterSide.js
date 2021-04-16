import React from 'react';
import { capitalize, phoneNumber } from "../../../../utility/utility";
import style, { container } from './CenterSide.module.scss'

export default function CenterExpandSide(props) {

  const handleRecruiterType = type => {
    if(type) {
      return capitalize(type)
    } else {
      return `-`
    }
  }
  
  return (
    <div className={container}>
      <Label label={"Tipe"}>
        <span className={style.value}>{handleRecruiterType(props.row.recruiter_type)}</span>
      </Label>
      <Label label={"Website"}>
        <span className={style.value}>{props.row.web ? props.row.web : "-"}</span>
      </Label>
      <Label label={"Contact"}>
        <span className={style.value}>{props.row.phone ? phoneNumber(props.row.phone) : "-"}</span>
      </Label>
    </div>
  )
}

const Label = (props) => {
  return (
    <div className={style.label_container}>
      <div className={style.key}>
        <span className={style.attribute}>{props.label}</span>
        <span>:</span>
      </div>
      {props.children}
    </div>
  )
}