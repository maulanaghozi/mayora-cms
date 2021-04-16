import React from 'react';
import style from './List.module.scss';

export default function List({title, value}) {
    return (
        <div className={style.container_list}>
            <span className={style.title}>{title}</span>
            <span className={style.value}>{value}</span>
        </div>
    )
}