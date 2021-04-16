import React from 'react';
import classNames from 'classnames';

import style from '../PortfolioTable.module.scss'

export default function Thumbnail({ row }) {
    return (
        <div className={classNames(style.table_cell, style.column_video)}>
            <div
                className={style.thumbnail}
                style={{
                    backgroundImage: 'url(' + row.thumbnail_url + ')'
                }}
            >

            </div>
        </div>
    )
}