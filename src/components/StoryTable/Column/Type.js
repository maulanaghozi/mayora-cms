import React from 'react';
import { table_cell, column_tag } from '../StoryTable.module.scss';
import classNames from 'classnames';

export default function Tag(props) {
    return (
        <div className={classNames(table_cell, column_tag)}>
            {ModifyText(props.row.type)}
        </div>
    )
}

function ModifyText(string) {
    if (string === 'tutorials') {
        return 'Tutorials'
    } else if (string === 'success-story') {
        return 'Success Story'
    } else if (string === 'expert-says') {
        return 'Expert Says'
    }
}