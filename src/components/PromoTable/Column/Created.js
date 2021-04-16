import React from 'react'
import moment from 'moment'
import { table_cell, column_created } from '../PromoTable.module.scss'

export default function Created({ row }) {
    return (
        <div className={table_cell + ' ' + column_created}>
            <div>{moment(row.created_at * 1000).format('DD MMM YYYY')}</div>
            <div>{moment(row.created_at * 1000).format('hh:mm:ss')}</div>
        </div>
    )
}