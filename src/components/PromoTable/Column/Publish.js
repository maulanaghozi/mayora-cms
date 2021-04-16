import React from 'react'
import moment from 'moment'
import { table_cell, column_publish } from '../PromoTable.module.scss'

export default function Publish(props) {
    return (
        <div className={table_cell + ' ' + column_publish}>
            <div>
                {
                    props.row.published_date_start ?
                    moment.unix(props.row.published_date_start).format('DD MMM YYYY') + ' s/d ' :
                    '-'
                }
            </div>
            <div>
                {
                    props.row.published_date_end &&
                    moment.unix(props.row.published_date_end).format('DD MMM YYYY')
                }
            </div>
        </div>
    )
}