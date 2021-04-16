import React from 'react'
import moment from 'moment'

import { ReactComponent as ViewIcon } from '../../../assets/eye_grey.svg'
import { ReactComponent as CastingIcon } from '../../../assets/clapperboard.svg'
import { ReactComponent as MoreIcon } from '../../../assets/more_horizontal.svg'


import {
    group,
    table_header,
    table_body,
    table_row,
    table_cell,
    column_title,
    column_type,
    column_due_date,
    column_posted_date,
    column_status,
    column_action,
    option
} from './Job.module.scss'

const header = [
    'Title',
    'Type',
    'Due Date',
    'Posted Date',
    'Status',
    'Action'
]

const headerClasses = [
    column_title,
    column_type,
    column_due_date,
    column_posted_date,
    column_status,
    column_action
]

export default function RecruiterTable({ data }) {
    return (
        <div className={group}>
            <div className={table_header}>
                {header.map((head, index) => (<div key={index} className={table_cell + ' ' + headerClasses[index]}>{head}</div>))}
            </div>
            <div className={table_body}>
                {data.map((row, index) => (
                    <div className={table_row} key={index}>
                        {/* Title */}
                        <div className={table_cell + ' ' + column_title}>
                            <img src={row.image} alt={'pr_pic'} />
                            <div>{row.title}</div>
                        </div>
                        {/* Type */}
                        <div className={table_cell + ' ' + column_type}>
                            <p style={{ textTransform: 'capitalize' }}>{row.casting_type}</p>
                        </div>
                        {/* Due Date */}
                        <div className={table_cell + ' ' + column_due_date}>
                            <p>{moment(row.due_date * 1000).format('DD MMM YYYY')}</p>
                        </div>
                        {/* Posted Date */}
                        <div className={table_cell + ' ' + column_posted_date}>
                            <p>{moment(row.posted_date * 1000).format('DD MMM YYYY')}</p>
                            <p>{moment(row.posted_date * 1000).format('hh:mm:ss')}</p>
                        </div>
                        {/* Status */}
                        <div className={table_cell + ' ' + column_status}>
                            <select className={option}>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                        {/* Action */}
                        <div className={table_cell + ' ' + column_action}>
                            <ViewIcon />
                            <CastingIcon />
                            <MoreIcon />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}