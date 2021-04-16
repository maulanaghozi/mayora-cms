import React from 'react';
import moment from "moment";
import { replaceString, capitalize } from "../../../../utility/utility";
import style, { container } from './CenterSide.module.scss'

export default function CenterExpandSide(props) {
  const handleAge = dob => {
    let age;

    if(dob) {
      age = moment(dob).fromNow()
    }

    if(age) {
      return replaceString(age, "years ago", "tahun" )
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

  const handleHairType = hairType => {
    if(hairType) {
      return hairType;
    } else {
      return "-";
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
  return (
    <div className={container}>
      <Label label={"gender"}>
        <span className={style.value}>{handleRecruiterType(props.row.gender)}</span>
      </Label>

      <Label label={"Birthdate"}>
        <span className={style.value}>{handleBirthdate(props.row.dob)}</span>
      </Label>
      <Label label={"umur"}>
        <span className={style.value}>{handleAge(props.row.dob)}</span>
      </Label>
      <Label label={"tinggi"}>
        <span className={style.value}>{props.row.height} cm</span>
      </Label>
      <Label label={"berat"}>
        <span className={style.value}>{props.row.weight} kg</span>
      </Label>
      <Label label={"kulit"}>
        {handleSkinColor(props.row.skin_color)}
      </Label>
      <Label label={"pakaian"}>
        <span 
          className={style.value}>
            {props.row.min_clothes_size} - {props.row.max_clothes_size}
          </span>
      </Label>
      <Label label={"rambut"}>
        <span className={style.value}>{handleHairType(props.row.hair_type)}</span>
      </Label>
      <Label label={"suku"}>
        <span className={style.value}>{handleEthnicity(props.row.ethnicity)}</span>
      </Label>
      <Label label={"manage by"}>
        <span className={style.value}>{handleAgency(props.row.agency)}</span>
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