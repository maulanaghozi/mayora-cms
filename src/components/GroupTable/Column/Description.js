import React from 'react';
import { table_cell, column_description } from '../GroupTable.module.scss'

export default function Description(props) {
    return (
        <div className={table_cell + ' ' + column_description}>{props.row.description}</div>
    )
}
