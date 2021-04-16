import React from 'react'
import { container, title, content, type } from './CenterSide.module.scss'

export default function CenterExpandSide(props) {
    return (
        <div className={container}>
            <div className={content}>
                <span className={title}>Type : </span>
                <span className={type}>
                    {props.row.type || '-'}
                </span>
            </div>
            <div className={content}>
                <span className={title}>Description :</span>
                <div>{props.row.description || '-'}</div>
            </div>
        </div>
    )
}