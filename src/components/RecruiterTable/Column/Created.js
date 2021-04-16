import React from 'react'
import moment from 'moment'
import { table_cell, column_created } from '../RecruiterTable.module.scss'

export default function Created(props) {
    const handleExpand = () => {
        if (props.expandRow !== props.index) {
            props.setExpandRow(props.index);
        } else {
            props.setExpandRow(null);
        }
    }
    return (
        <div 
            className={table_cell + ' ' + column_created}
            onClick={handleExpand}
        >
            <div>{moment.unix(props.row.created_at).format('DD MMM YYYY')}</div>
            <div>{moment.unix(props.row.created_at).format('HH:mm:ss')}</div>
        </div>
    )
}