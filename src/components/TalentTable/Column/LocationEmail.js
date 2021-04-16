import React from 'react'
import { table_cell, column_location } from '../TalentTable.module.scss'

export default function LocationEmail(props) {
    const handleExpand = () => {
        if (props.expandRow !== props.index) {
            props.setExpandRow(props.index);
        } else {
            props.setExpandRow(null);
        }
    }

    return (
        <div 
            className={table_cell + ' ' + column_location}
            onClick={handleExpand}
        >
            <span>{props.row.location ? props.row.location : "-"}</span>
            <span>{props.row.email ? props.row.email : "-"}</span>
            <span>{props.row.phone ? props.row.phone : "-"}</span>
        </div>
    )
}