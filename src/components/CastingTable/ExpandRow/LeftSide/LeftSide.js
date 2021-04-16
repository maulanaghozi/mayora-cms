import React from 'react'

import { ReactComponent as LikeIcon } from '../../../../assets/casting/like.svg'
import { ReactComponent as CommentIcon } from '../../../../assets/casting/comment.svg'
import { ReactComponent as ApplicantIcon } from '../../../../assets/casting/applicant.svg'
import style from './LeftSide.module.scss'

export default function LeftExpandSide(props) {
    return (
        <div className={style.container}>
            <div className={style.thumbnail_container}>
                {
                    props.row.thumbnail ?
                    <img src={props.row.thumbnail.thumbnail_url}/> :
                    <span>{'thumbnail is not uploaded yet'}</span>
                }
            </div>
            <span className={style.title}>{props.row.title}</span>
            <div>
                <div className={style.container_icon}>
                    <LikeIcon />
                    <span className={style.blue}>Likes :</span>
                    {/* <span>{props.row.like}</span> */}
                    <span>{'-'}</span>
                </div>
                <div className={style.container_icon}>
                    <CommentIcon />
                    <span className={style.blue}>Comments :</span>
                    {/* <span>{props.row.comment}</span> */}
                    <span>{'-'}</span>
                </div>
                <div className={style.container_icon}>
                    <ApplicantIcon />
                    <span className={style.blue}>Applicants :</span>
                    <span>{props.row.total_applicant}</span>
                </div>
            </div>
        </div>
    )
}