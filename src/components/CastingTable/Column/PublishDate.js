import React from 'react';
import moment from 'moment';
import { table_cell, column_publish_date } from '../CastingTable.module.scss';
import classNames from 'classnames';

export default function PublishDate(props) {
    const handleExpand = () => {
        if (props.expandRow !== props.index) {
            props.setExpandRow(props.index);
        } else {
            props.setExpandRow(null);
        }
    }

    return (
        <div
            className={classNames(table_cell, column_publish_date)}
            onClick={handleExpand}
        >
            {
                props.row && props.row.published_at ?
                <div>
                    <div>{moment.unix(props.row.published_at).format('DD MMM YYYY')}</div>
                    <div>{moment.unix(props.row.published_at).format('hh:mm:ss')}</div>
                </div> :
                '-'
            }
        </div>
    )
}