import React from 'react';
import {
    table_cell, column_name, title, inner_circle, red, green, circle_container,
    bg_blue, bg_white
} from '../GroupTable.module.scss';
import { capitalize } from '../../../utility/utility';

export default function NameColumn(props) {
    return (
        <div className={table_cell + ' ' + column_name}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <img style={{userSelect: 'none'}} src={props.row.profile_pic_url} />
                <div className={circle_container + ' ' + ((props.index + 1)%2 == 0 ? bg_blue : bg_white)}>
                    <div className={inner_circle + ' ' + (props.row.active === '1' ? green : red) } />
                </div>
            </div>
            <div>
                <div className={title} style={{marginBottom: 6}}>
                    {capitalize(props.row.name)}
                </div>
                {/* <span>{`#${props.row.id}`}</span> */}
            </div>
        </div>
    )
}
