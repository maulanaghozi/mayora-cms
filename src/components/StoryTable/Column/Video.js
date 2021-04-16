import React from 'react';
import classNames from 'classnames';
// import Youtube from '../../Youtube/Youtube'

import style from '../StoryTable.module.scss'

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
            {/* <img src={row.thumbnail_url} /> */}
            {/* <Youtube width="80" height="45" vid_url={row.vid_url} /> */}
        </div>
    )
}