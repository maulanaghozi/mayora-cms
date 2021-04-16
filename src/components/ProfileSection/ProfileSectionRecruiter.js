// Packages
import React, { useState, useEffect } from "react";
import classNames from "classnames";

// Components
import HeaderSection from "./HeaderSection";
import DetailTab from "./DetailTab";
import Job from "./JobPost";
import PhotoTab from "./PhotoTab";
import VideoTab from "./VideoTab";

// Style
import style from "./ProfileSection.module.scss"
import { useLocation, useHistory, useParams } from "react-router-dom";

const navigations = [
  "detail" ,
  "job", 
  // "photo", 
  // "video"
]

export default function ProfileSectionRecruiter({ data, className }) {
  const [currentTab, setCurrentTab] = useState(null);

  const location = useLocation();
  const history = useHistory();
  const {user_id} = useParams();

  useEffect(() => {
    const path = location.pathname.split('/');
    console.log(path);
    switch (path[path.length - 1]) {
      case "casting":
        setCurrentTab("job");
        break;
      default:
        setCurrentTab("detail");
        break;
    }
  }, []);

  const onTabChange = tab => {
    setCurrentTab(tab);
    
    switch (tab) {
      case "job":
        history.push(`/user/recruiter/${user_id}/casting`)
        break;
    
      default:
        history.push(`/user/recruiter/${user_id}/detail`)
        break;
    }
  }

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
            onClick={() => onTabChange(tab)}
          >
            {tab.toUpperCase()}
          </span>
        ))}
      </div>
      {currentTab === "detail" && 
        <DetailTab data={data} isTalent={false}/>
      }

      {currentTab === "job" &&
        <Job/>
      }

      {currentTab === "photo" &&
        <PhotoTab/>
      }
      
      {currentTab === "video" &&
        <VideoTab/>
      }

    </div>
  )
}