import React from 'react';
import moment from 'moment';
import style from '../PortfolioTable.module.scss';
import classNames from 'classnames';

export default function Publish(props) {
    return (
        <div className={classNames(style.table_cell, style.column_publish_date)}>
            {
                props.row.published_at ?
                <>
                    <div>{moment.unix(props.row.published_at).format('DD MMM YYYY')}</div>
                    <div>{moment.unix(props.row.published_at).format('hh:mm:ss')}</div>
                </> :
                '-'
            }
        </div>
    )
}