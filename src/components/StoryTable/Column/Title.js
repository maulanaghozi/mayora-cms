import React from 'react'
import { table_cell, column_title } from '../StoryTable.module.scss';
import TextBoxEllipsis from '../../TextBoxEllipsis/TextBoxEllipsis';
import classNames from 'classnames';

export default function Title(props) {
    return (
        <div className={classNames(table_cell, column_title)}>
            <TextBoxEllipsis
                text={props.row.title}
                lineHeight={16}
                lineClamp={3}
                backgroundColor={props.index % 2 === 0 ? 'white' : '#e7f1f5'}
            />
        </div>
    )
}