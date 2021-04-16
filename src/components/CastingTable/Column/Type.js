import React from 'react';
import { table_cell, column_type } from '../CastingTable.module.scss';
import classNames from 'classnames';

export default function Type(props) {
    const handleExpand = () => {
        if (props.expandRow !== props.index) {
            props.setExpandRow(props.index);
        } else {
            props.setExpandRow(null);
        }
    }

    return (
        <div
            className={classNames(table_cell, column_type)}
            onClick={handleExpand}
        >
            {
                props.row ?
                <span>{props.row.type + ' / ' + props.row.production_type}</span> :
                '-'
            }
        </div>
    )
}