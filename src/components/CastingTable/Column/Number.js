import React from 'react';
import classNames from 'classnames';
import { ReactComponent as ShrinkIcon } from '../../../assets/shrink.svg'
import { ReactComponent as ExpandIcon } from '../../../assets/expand.svg'
import { table_cell, column_number } from '../CastingTable.module.scss'

export default function Number(props) {
    const handleExpand = () => {
        if (props.expandRow !== props.index) {
            props.setExpandRow(props.index);
        } else {
            props.setExpandRow(null);
        }
    }

    return (
        <div    
            className={classNames(table_cell, column_number)}
            onClick={handleExpand}
        >
            <span>{props.index + 1}</span>
            {
                (props.expandRow === props.index) ?
                <ShrinkIcon /> :
                <ExpandIcon />

            }
        </div>
    )
}