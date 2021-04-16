import React from 'react';
import moment from 'moment';
import style from './RightSide.module.scss';

export default function RightExpandSide(props) {
    return (
        <div className={style.container}>
            <div className={style.content}>
                <span className={style.field}>
                    Role <span>:</span>
                </span>
                {
                    props.row.job_role ?
                    <span className={style.fill}>
                        {props.row.job_role}
                    </span> :
                    '-'
                }
            </div>
            <div className={style.content}>
                <span className={style.field}>
                    Gender <span>:</span>
                </span>
                {
                    props.row.gender ?
                    <span className={style.fill}>
                        {props.row.gender}
                    </span> :
                    '-'
                }
            </div>
            <div className={style.content}>
                <span className={style.field}>
                    Umur <span>:</span>
                </span>
                {
                    props.row.min_age && props.row.max_age ?
                    <span className={style.fill}>
                        {
                            props.row.min_age +
                            ' - ' +
                            props.row.max_age +
                            ' Tahun'
                        }
                    </span> :
                    '-'
                }
            </div>
            <div className={style.content}>
                <span className={style.field}>
                    Deadline <span>:</span>
                </span>
                {
                    props.row.due_date ?
                    <span className={style.fill}>
                        {
                            moment
                            .unix(props.row.due_date)
                            .format('DD MMM YYYY')
                        }
                    </span> :
                    '-'
                }
            </div>
            <div className={style.content}>
                <span className={style.field}>
                    Tanggal Shooting <span>:</span>
                </span>
                {
                    <span className={style.fill}>
                        {
                            props.row.shooting_date_tbc === 1 ?
                            'TBC' :
                            moment
                            .unix(props.row.shooting_date)
                            .format('DD MMM YYYY')
                        }
                    </span>
                }
            </div>
            <div className={style.content}>
                <span className={style.field}>
                    Lokasi Shooting <span>:</span>
                </span>
                {
                    Array.isArray(props.row.location) &&
                    props.row.location.length > 0 ?
                    <span className={style.fill}>
                        {props.row.location.join(', ')}
                    </span> :
                    '-'
                }
            </div>
            <div className={style.content}>
                <span className={style.field}>
                    Workshop <span>:</span>
                </span>
                {
                    props.row.workshop_date ?
                    <span className={style.fill}>
                        {
                            props.row.workshop_date
                        }
                    </span> :
                    '-'
                }
            </div>
            <div className={style.content}>
                <span className={style.field}>
                    Wardrobe Fitting <span>:</span>
                </span>
                {
                    props.row.wardrobe_date ?
                    <span className={style.fill}>
                        {
                            props.row.wardrobe_date
                        }
                    </span> :
                    '-'
                }
            </div>
            <div className={style.content}>
                <div className={style.field}>
                    Other Requirement(s) <span>:</span>
                </div>
                <div className={style.requirement_container}>
                    {handleOtherRequirement(props.row)}
                </div>
            </div>
        </div>
    )
}

const handleOtherRequirement = row => {
    const otherRequirements = [
        'body_type',
        'ethnicity',
        'experience',
        'hair_type',
        'skin_color',
        'skill'
    ].map(key => {
        if (!(
            (Array.isArray(row[key]) && row[key].length === 0) ||
            row[key] === null ||
            row[key] === undefined ||
            !row.hasOwnProperty(key)
        )) {
            if (key === 'skin_color') {
                return row[key].map(
                    el => (
                        <div key={el.skin_color} className={style.requirement}>
                            {el.skin_color}
                        </div>
                    )
                )
            } else {
                return row[key].map(
                    el => {
                        if (el) {
                            return (
                                <div key={el} className={style.requirement}>
                                    {el}
                                </div>
                            )
                        }
                    }
                )
            }
        }
    })

    if (otherRequirements.length > 0) {
        return otherRequirements
    } else {
        return '-'
    }
}