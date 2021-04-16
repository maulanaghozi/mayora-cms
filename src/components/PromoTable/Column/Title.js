import React from 'react'
import { table_cell, column_title, elipis } from '../PromoTable.module.scss'

export default function Title({ row }) {
    return (
        <div className={table_cell + ' ' + column_title}>
            <div className={elipis}>
                {row.title}
            </div>
        </div>
    )
}