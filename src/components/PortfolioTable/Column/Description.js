import React from 'react';
import { table_cell, column_description } from '../PortfolioTable.module.scss';
import TextBoxEllipsis from '../../TextBoxEllipsis/TextBoxEllipsis';
import classNames from 'classnames';

export default function Description(props) {
    return (
        <div className={classNames(table_cell, column_description)}>
            <TextBoxEllipsis
                text={props.row.description}
                lineHeight={16}
                lineClamp={3}
                backgroundColor={props.index % 2 === 0 ? 'white' : '#e7f1f5'}
            />
            
        </div>
    )
}