import React from 'react'
import { table_cell, column_image } from '../PromoTable.module.scss'

export default function Image({ row }) {
    return (
        <div className={table_cell + ' ' + column_image}>
            <img src={row.image_url} />
        </div>
    )
}