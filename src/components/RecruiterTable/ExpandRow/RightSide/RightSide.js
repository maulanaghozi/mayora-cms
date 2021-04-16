import React from 'react';
import style from './RightSide.module.scss';

export default function RightExpandSide(props) {
    return (
        <div className={style.container}>
            <div className={style.content_flex}>
                <p className={style.blue_bold}>{props.row.casting_count ? props.row.casting_count : 0}</p>
                <p className={style.text}>job post</p>
            </div>
            {/* <div className={style.content_flex}>
                <p className={style.blue_bold}>{props.row.followers ? props.row.followers : 0}</p>
                <p className={style.text}>followers</p>
            </div>
            <div className={style.content_flex}>
                <p className={style.blue_bold}>{props.row.following ? props.row.following : 0}</p>
                <p className={style.text}>following</p>
            </div> */}
        </div>
    )
}