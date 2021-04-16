import React from 'react';
import moment from 'moment';
import { table_cell, column_due_date } from '../CastingTable.module.scss';
import classNames from 'classnames';

export default function DueDate(props) {
    const handleExpand = () => {
        if (props.expandRow !== props.index) {
            props.setExpandRow(props.index);
        } else {
            props.setExpandRow(null);
        }
    }
    
    return (
        <div
            className={classNames(table_cell, column_due_date)}
            onClick={handleExpand}
        >
            {
                props.row ? (
                    props.row.due_date_open ?
                    <span>{'open'}</span> :
                    <span>
                        {moment.unix(props.row.due_date).format('DD MMM YYYY')}
                    </span>
                ) : '-'
            }
        </div>
    )
}