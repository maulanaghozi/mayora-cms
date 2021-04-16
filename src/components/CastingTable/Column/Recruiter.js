import React from 'react';
import style from '../CastingTable.module.scss';
import classNames from 'classnames';
import kestingrum from '../../../assets/kestingrum_logo.svg'

export default function Recruiter(props) {
    const handleExpand = () => {
        if (props.expandRow !== props.index) {
            props.setExpandRow(props.index);
        } else {
            props.setExpandRow(null);
        }
    }

    return (
        <>
            <div
                className={classNames(style.table_cell, style.column_recruiter)}
                onClick={handleExpand}
            >
                {
                    props.row.recruiter ?
                    <>
                        <div className={style.picture_container}>
                            {
                                props.row.recruiter.profile_pic_url ?
                                <img className={style.profile_picture} src={props.row.recruiter.profile_pic_url} /> :
                                <img className={style.default_picture} src={kestingrum} />
                            }
                        </div>
                        <span>{props.row.recruiter.name}</span>
                    </>
                    :
                    '-'
                }
            </div>
        </>
    )
}