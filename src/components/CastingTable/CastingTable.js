import React, { useState } from 'react';
import classNames from 'classnames'

import Number from './Column/Number';
import Recruiter from './Column/Recruiter';
import Title from './Column/Title';
import Type from './Column/Type';
import DueDate from './Column/DueDate';
import PublishDate from './Column/PublishDate';
import Status from './Column/Status';
import Action from './Column/Action';
import ExpandRow from './ExpandRow/ExpandRow';
import NormalHeader from '../Table/NormalHeader';
import SortableHeader from '../Table/SortableHeader'

import style from './CastingTable.module.scss'

const header = [
    'Recruiter',
    'Title',
    'Type',
    'Due Date',
    'Publish Date',
    'Status',
    'Action',
]

const headerClasses = [
    style.column_recruiter,
    style.column_title,
    style.column_type,
    style.column_due_date,
    style.column_publish_date,
    style.column_status,
    style.column_action
]

const sortAttributes = [
    null,
    'title',
    null,
    'due_date',
    'published_at',
    null,
    null
]

export default function CastingTable(props) {
    const [openRow, setOpenRow] = useState(null);
    const [expandRow, setExpandRow] = useState(null);
    const [currentSort, setCurrentSort] = useState('Title');

    return (
        <div className={style.table_container}>
            <div className={style.table_header}>
                <div
                    className={classNames(
                        style.table_cell,
                        style.column_number,
                        style.header
                    )}
                >
                    <span>No.</span>
                </div>
                {header.map((head, index) => {
                    if (sortAttributes[index]) {
                        const sortBy = sortAttributes[index];

                        return (
                            <SortableHeader
                                key={head}
                                index={index}
                                className={headerClasses[index]}
                                columnName={head}
                                handleSort={props.handleSearchCriteriaChange}
                                sortBy={sortBy}
                                currentSort={currentSort}
                                setCurrentSort={setCurrentSort}
                            />
                        )
                    } else {
                        return (
                            <NormalHeader
                                key={index}
                                index={index}
                                className={headerClasses[index]}
                                columnName={head}
                            />
                        )
                    }
                    
                })}
            </div>
            <div className={style.table_body}>
                {props.data && props.data.map((row, index, arr) => (
                    <div className={style.table_row} key={index}>
                        <div className={style.table_row_child} key={row.casting_id}>
                            <Number
                                row={row}
                                index={index}
                                expandRow={expandRow}
                                setExpandRow={setExpandRow}
                            />
                            <Recruiter
                                row={row}
                                index={index}
                                expandRow={expandRow}
                                setExpandRow={setExpandRow}
                            />
                            <Title
                                row={row}
                                index={index}
                                expandRow={expandRow}
                                setExpandRow={setExpandRow}
                            />
                            <Type
                                row={row}
                                index={index}
                                expandRow={expandRow}
                                setExpandRow={setExpandRow}
                            />
                            <DueDate
                                row={row}
                                index={index}
                                expandRow={expandRow}
                                setExpandRow={setExpandRow}
                            />
                            <PublishDate
                                row={row}
                                index={index}
                                expandRow={expandRow}
                                setExpandRow={setExpandRow}
                            />
                            <Status row={row} setKey={props.setKey} />
                            <Action
                                row={row}
                                index={index}
                                openRow={openRow}
                                setKey={props.setKey}
                                setOpenRow={setOpenRow}
                                totalRow={arr.length}
                            />
                        </div>
                        {
                            expandRow === index &&
                            <ExpandRow
                                row={row}
                                index={index}
                                expandRow={expandRow}
                                setExpandRow={setExpandRow}
                            />
                        }
                    </div>
                ))}
                {Array.isArray(props.data) && props.data.length === 0 && 
                    <h2 className={style.table_empty}>There is no Casting</h2>
                }
            </div>
        </div>
    )
}

