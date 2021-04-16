import React from 'react'
import classNames from 'classnames'
import { table_cell, column_description, elipis } from '../PromoTable.module.scss'

export default function Description({ row }) {
    return (
        <div className={table_cell + ' ' + column_description} >
            <p className={elipis}>{row.plain_description}</p>
        </div>
    )
}