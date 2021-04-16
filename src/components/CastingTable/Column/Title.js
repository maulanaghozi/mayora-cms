import React from 'react';
import { table_cell, column_title, title } from '../CastingTable.module.scss';
import classNames from 'classnames';

export default function Title(props) {
    const handleExpand = () => {
        if (props.expandRow !== props.index) {
            props.setExpandRow(props.index);
        } else {
            props.setExpandRow(null);
        }
    }
    
    return (
        <div
            className={classNames(table_cell, column_title)}
            onClick={handleExpand}
        >
            {
                <img src={
                    props.row.thumbnail ?
                    props.row.thumbnail.thumbnail_url :
                    'fallback_url' // <TODO> Add fallback image url
                }/>
            }
            {
                props.row ? 
                <span className={title}>{props.row.title}</span> :
                '-'
            }
        </div>
    )
}