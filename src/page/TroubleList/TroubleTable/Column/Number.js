import React from 'react'
import { table_cell, column_number } from '../PromoTable.module.scss'

export default function Action({ index, row }) {
    return (
        <div className={table_cell + ' ' + column_number}>
            {index + 1}
        </div>
    )
}