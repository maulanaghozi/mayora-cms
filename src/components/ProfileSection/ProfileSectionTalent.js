// Packages
import React, { useState } from "react";
import classNames from "classnames";

// Components
import HeaderSection from "./HeaderSection";
import DetailTab from "./DetailTab";
import PhotoTab from "./PhotoTab";

// Style
import style from "./ProfileSection.module.scss"

const navigations = [
  "detail" ,
  // "photo"
]

export default function ProfileSectionTalent({ data, className }) {
  const [currentTab, setCurrentTab] = useState("detail")

  return (
    <div className={classNames(style.container, className)}>
      <HeaderSection
        data={data}
      />
      <div className={style.navigation_title}>
        {Array.isArray(navigations) && navigations.map((tab, index) => (
          <span 
            key={index}
            className={classNames(style.nav, {[style.active] : tab === currentTab})}
            onClick={() => setCurrentTab(tab)}
          >
            {tab.toUpperCase()}
          </span>
        ))}
      </div>
      {currentTab === "detail" && 
        <DetailTab data={data} isTalent={true}/>
      }
      {currentTab === "photo" &&
        <PhotoTab/>
      }
    </div>
  )
}