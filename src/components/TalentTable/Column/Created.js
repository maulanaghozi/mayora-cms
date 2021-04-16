import React from 'react'
import moment from 'moment'
import { table_cell, column_created } from '../TalentTable.module.scss'

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
            <div>
                {
                    props.row.created_at ?
                    moment.unix(props.row.created_at).format('DD MMM YYYY') :
                    'Kestingrum v1'
                }
            </div>
            <div>
                {
                    props.row.created_at ?
                    moment.unix(props.row.created_at).format('HH:mm:ss'):
                    'User'
                }
            </div>
        </div>
    )
}