// Package
import React from "react";

// Utility
import { phoneNumber, getProfilePic } from "../../utility/utility";

// Assets
import { ReactComponent as LocationIcon } from "../../assets/user/map_pin.svg";
import { ReactComponent as PhoneIcon } from "../../assets/user/phone.svg";
import { ReactComponent as MailIcon } from "../../assets/user/mail.svg";

// Style
import style from "./ProfileSection.module.scss";

export default function HeaderSection({data}) {

  const handlePhone = phone => {
    if(phone) {
      return phoneNumber(phone)
    } else {
      return `-`
    }
  }

  return (
    <div className={style.header_section}>
      <div className={style.profile}>
        <img 
          src={getProfilePic(data.profile_pic_url)} 
          alt="profile pic" 
          className={style.profile_pic} 
        />
        <div className={style.name_info}>
          <span className={style.fullname}>{data.name}</span>
          <span className={style.username}>{data.username}</span>
        </div>
      </div>
      <div className={style.address_info}>
        <div className={style.location}>
          <LocationIcon />
          <span className={style.blueBold}>{data.location || '-'}</span>
        </div>
        <div className={style.phone}>
          <PhoneIcon />
          <span className={style.blueBold}>{handlePhone(data.phone)}</span>
        </div>
        <div className={style.email}>
          <MailIcon />
          <span className={style.blueBold}>{data.email}</span>
        </div>
      </div>
      <div className={style.shadow}></div>
    </div>
  )
}