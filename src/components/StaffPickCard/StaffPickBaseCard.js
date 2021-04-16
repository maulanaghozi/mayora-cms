import React from 'react';
import style from './StaffPickBaseCard.module.scss';

export default function StaffPickBaseCard(props) {
    return (
        <div
            className={style.container}
            style={{
                backgroundImage: 'url("' + props.data.profile_pic_url + '")'
            }}
        >
            <div className={style.index_container}>
                <span>
                    {props.index + 1}
                </span>
            </div>
            <div
                onClick={props.handleRemove}
                className={style.cross_container}
            >
                <Cross />
            </div>
        </div>
    )
}

const Cross = () => {
    return (
        <div className={style.cross}>
            <div className={style.line1}></div>
            <div className={style.line2}></div>
            <div className={style.shadow1}></div>
            <div className={style.shadow2}></div>
        </div>
    )
}