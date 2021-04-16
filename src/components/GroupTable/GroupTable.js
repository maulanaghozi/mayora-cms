import React, { useState } from 'react';
import classNames from 'classnames'

import NameId from './Column/NameId';
import TypeMember from './Column/TypeMember';
import Description from './Column/Description';
import Created from './Column/Created';
import Featured from './Column/Featured';
import Action from './Column/Action';

import { ReactComponent as SortIcon } from '../../assets/chevron_down_blue.svg'

import style, {
    group,
    table_header,
    table_body,
    table_row,
    table_cell,
    column_name,
    column_type,
    column_description,
    column_created,
    column_featured,
    column_action,
} from './GroupTable.module.scss'

const header = [
    'Type / Member',
    'Description',
    'Created Date / Created By',
    'Featured Group',
    'Action',
]

const headerClasses = [
    column_type,
    column_description,
    column_created,
    column_featured,
    column_action,
]

export default function GroupTable(props) {
    const [openRow, setOpenRow] = useState(null)
    const isAscending = () => (props.sort === 'asc');

    const handleSort = () => {
        isAscending() ? props.setSort('desc') : props.setSort('asc');
    }

    return (
        <div className={group}>
            <div className={table_header}>
                <div onClick={handleSort} className={classNames(table_cell, column_name)}>
                    <div style={{ cursor: 'pointer', userSelect: 'none' }}>
                        <span>Name </span>
                        <SortIcon transform={'scale(1,' + (isAscending() ? '1)' : '-1)')} />
                        <span> / ID</span>
                    </div>
                </div>
                {header.map((head, index) => (<div key={index} onClick={index === 0 ? handleSort : null} className={table_cell + ' ' + headerClasses[index]}>{head}</div>))}
            </div>
            <div className={table_body}>
                {Array.isArray(props.data) && props.data.map((row, index, arr) => (
                    <div className={table_row} key={index}>
                        <NameId index={index} row={row} />
                        <TypeMember row={row} />
                        <Description row={row} />
                        <Created row={row} />
                        <Featured row={row} />
                        <Action
                            row={row}
                            index={index}
                            openRow={openRow}
                            setKey={props.setKey}
                            setOpenRow={setOpenRow}
                            totalRow={arr.length}
                        />
                    </div>
                ))}
                {Array.isArray(props.data) && props.data.length === 0 && 
                    <h2 className={style.table_empty}>There is no Group</h2>
                }
            </div>
        </div>
    )
}