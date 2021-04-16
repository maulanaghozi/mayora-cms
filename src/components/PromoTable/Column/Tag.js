import React from 'react';
import {
    table_cell,
    column_tag,
    tag_container
} from '../PromoTable.module.scss';

export default function Tag({row}) {
    return (
        <div className={table_cell + ' ' + column_tag}>
            {
                row.tag ?
                row.tag.map((entry, index) => (
                    <div
                        key={index}
                        className={tag_container}>
                        {entry}
                    </div>
                )) :
                '-'
            }
        </div>
    )
}