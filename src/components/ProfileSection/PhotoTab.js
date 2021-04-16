import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { http } from "../../utility/http";
import style from "./ProfileSection.module.scss";

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
        type: 'photo'
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
    <div className={style.photo_container}>
      {Array.isArray(profilePost) && profilePost.map(photo => {
        if(photo.type === "photo") {
          return(
            <img
              key={photo.id}
              className={style.img}
              src={photo.thumbnail_url}
              alt={"profile post"}
            />
          )
        }
      })}
      {!profilePost && <span>{"There is no Photo"}</span>}
    </div>
  )
}