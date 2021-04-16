// Packages
import React from "react";
import moment from "moment";
import classNames from "classnames";

// Utility
import { phoneNumber, replaceString, capitalize } from "../../utility/utility";

// Assets
import { ReactComponent as QuoteIcon } from "../../assets/user/quotation.svg";

// Style
import style, { detail_container, attribute } from "./ProfileSection.module.scss";

export default function DetailRecruiter({data, isTalent}) {

  const handleDescription = desc => {
    if(desc) {
      return desc
    } else {
      return `There is no Description`
    }
  }

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

  const handleSkinColor = skinColor => {
    if(skinColor && typeof skinColor === "object") {
      return (
        <div className={style.skin_color}>
          <div 
            className={style.hex_color} 
            style={{backgroundColor: data.skin_color.hex_color}}>
          </div>
          <span className={style.value}>{data.skin_color.skin_color}</span>
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

  return (
    <div className={detail_container}>
      <div className={style.desc_box}>
        <QuoteIcon />
        <p className={style.desc}>{handleDescription(data.description)}</p>
      </div>
      {isTalent && <Skill data={data}/>}
      <div className={style.info_detail_box}>
        {isTalent &&
          <React.Fragment>
            <Label label={"gender"}>
              <span className={style.value}>
                {data.gender ? capitalize(data.gender) : "-"}
              </span>
            </Label>

            <Label label={"Birthdate"}>
              <span className={style.value}>
                {handleBirthdate(data.dob)}
              </span>
            </Label>
            <Label label={"umur"}>
              <span className={style.value}>
                {handleAge(data.dob)}
              </span>
            </Label>
            <Label label={"tinggi"}>
              <span className={style.value}>
                {data.height ? data.height + " cm": "-"}  
              </span>
            </Label>
            <Label label={"berat"}>
              <span className={style.value}>
                {data.weight ? data.weight + " kg" : "-"}
              </span>
            </Label>
            <Label label={"kulit"}>
              {handleSkinColor(data.skin_color)}
            </Label>
            <Label label={"pakaian"}>
              <span 
                className={style.value}>
                  {data.min_clothes_size} - {data.max_clothes_size}
                </span>
            </Label>
            <Label label={"rambut"}>
              <span className={style.value}>
                {data.hair_type ? capitalize(data.hair_type) : "-"}
              </span>
            </Label>
            <Label label={"suku"}>
              <span className={style.value}>
                {handleEthnicity(data.ethnicity)}
              </span>
            </Label>
            <Label label={"manage by"}>
              <span className={style.value}>
                {handleAgency(data.agency)}
              </span>
            </Label>
          </React.Fragment>
        }
        {!isTalent && 
          <React.Fragment>
            <Label label={"Tipe"}>
              <span className={style.value}>
                {data.recruiter_type ? capitalize(data.recruiter_type) : "-"}
              </span>
            </Label>
            <Label label={"website"}>
              <span className={classNames(style.value, style.website)}>
                {data.web ? data.web : "-"}
              </span>
            </Label>
            <Label label={"contact"}>
              <span className={style.value}>
                {data.phone ?  phoneNumber(data.phone) : "-"}
              </span>
            </Label>
          </React.Fragment>
        }
      </div>
    </div>
  )
}

const Label = (props) => {
    return (
        <div className={style.label_container}>
            <div className={style.key}>
                <span className={attribute}>{props.label}</span>
                <span>:</span>
            </div>
            {props.children}
        </div>
    )
}

const Skill = (props) => {

  const renderSkill = (skill) => {
    let output = []

    if(skill.length > 0) {
      skill.forEach((el, index) => {
        output.push(<span key={index} className={style.tag}>{el}</span>)
      });
    } else {
      output = (<span>no additional skills</span>)
    }

    return output
  }

  return (
    <div className={style.skill_container}>
      <span className={style.label}>SKILL</span>
      {props.data && Array.isArray(props.data.skill) && 
        renderSkill(props.data.skill)
      }
    </div>
  )
}