import React from 'react';
import classNames from "classnames";
import { table_cell, column_status } from '../TalentCastingTable.module.scss'

export default function Status(props) {
    return (
        <div 
            className={table_cell + ' ' + column_status}
        >
            <span>{props.row.application_status ? props.row.application_status : "No Status"}</span>
        </div>
    )
}