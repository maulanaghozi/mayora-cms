import React from 'react';
import { container } from './PageCounter.module.scss';
import classNames from 'classnames';

export default function PageCounter(props) {
    let first = 0;
    let last = 0;
    if(props.result) {
        first = 1 + (props.searchCriteria.page - 1) * props.searchCriteria.rows;
        last = first - 1 + props.result.rows.length;

        if(last < first) {
            first = 0;
        }
    }

    return (
        <div className={classNames(container, props.className)}>
            { first + '-' + last + ' of ' + (props.result ? props.result.total_rows : 0) }
        </div>
    )
}
