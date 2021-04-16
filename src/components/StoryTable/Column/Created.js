import React from 'react';
import moment from 'moment';
import style from '../StoryTable.module.scss';
import classNames from 'classnames';

export default function Created({ row }) {
    return (
        <div className={classNames(style.table_cell, style.column_created_date)}>
            <div>{moment(row.created_at * 1000).format('DD MMM YYYY')}</div>
            <div>{moment(row.created_at * 1000).format('hh:mm:ss')}</div>
        </div>
    )
}