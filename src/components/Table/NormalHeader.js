import React from 'react';
import style from './Table.module.scss';
import classNames from 'classnames';

export default function NormalHeader (props) {
    return (
        <div
            className={classNames(
                style.table_cell,
                props.className,
                style.header
            )}
        >
            <span>{props.columnName}</span>
        </div>
    )
}