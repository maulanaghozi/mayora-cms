import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { http } from "../../utility/http";
import style, { img, play } from "./ProfileSection.module.scss"

import PlayIcon from "../../assets/play_circle.svg"

export default function DetailRecruiter(props) {
  const [profilePost, setProfilePost] = useState(null);
  const { user_id } = useParams() 
  const alert = useAlert()

  const getProfilePost = () => {
    const params = {
      method : "GET",
      path: "posting/profile/" + user_id,
      query: {
        user_id : user_id,
        type: "youtube"
      }
    }

    http(params).then(res => {
      if(res && res.code === "success") {
        setProfilePost(res.payload)
      } else {
        alert.error(res)
      }
    })
  }

  useEffect(() => {
    getProfilePost()
  }, [user_id])
  
  return (
    <div className={style.video_container}>
      {Array.isArray(profilePost) && profilePost.map(video => {
        if(video.type === "youtube") {
          return (
            <div 
              key={video.id}
              className={style.video}
            >
              <img 
                className={img} 
                src={video.thumbnail_url} 
                alt={""} />
              <img 
                className={play} 
                src={PlayIcon} 
                alt={""} />
            </div>
          )
        }
      })}
      {!profilePost && <span>{"There is no Video"}</span>}
    </div>
  )
}