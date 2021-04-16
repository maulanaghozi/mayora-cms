import React, { useState } from 'react'
import classNames from 'classnames'

import Number from './Column/Number'
import Title from './Column/Title'
import Description from './Column/Description'
import Talent from './Column/Talent'
import Video from './Column/Video'
import Publish from './Column/Publish'
import Created from './Column/Created'
import Status from './Column/Status'
import Action from './Column/Action'
import SortableHeader from '../Table/SortableHeader';
import NormalHeader from '../Table/NormalHeader';

import style from './PortfolioTable.module.scss'

const header = [
    'Title',
    'Description',
    'Video',
    'Talent',
    'Publish Date',
    'Created Date',
    'Status',
    'Action'
]

const headerClasses = [
    style.column_title,
    style.column_description,
    style.column_video,
    style.column_talent,
    style.column_publish_date,
    style.column_created_date,
    style.column_status,
    style.column_action
]

const sortAttributes = [
    'title',
    null,
    null,
    null,
    'published_at',
    'created_at',
    null,
    null
]

export default function PortfolioTable(props) {
    const [openMore, setOpenMore] = useState(false);
    const [currentSort, setCurrentSort] = useState('Publish Date');

    return (
        <div className={style.container}>
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
                                className={classNames(headerClasses[index], style.table_header)}
                                columnName={head}
                                handleSort={props.setSearchCriteria}
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
                {props.data && props.data.rows.map((row, index, arr) => (
                    <div className={style.table_row} key={row.id}>
                        <Number index={index} row={row} />
                        <Title index={index} row={row} />
                        <Description index={index} row={row} />
                        <Video row={row} />
                        <Talent row={row} />
                        <Publish row={row} />
                        <Created row={row} />
                        <Status setKey={() => props.setSearchCriteria({ key: props.searchCriteria.key + 1 })} row={row} />
                        <Action
                            row={row}
                            index={index}
                            openRow={openMore}
                            data={arr}
                            setOpenRow={setOpenMore}
                            setKey={() => props.setSearchCriteria({ key: props.searchCriteria.key + 1 })}
                            totalRow={arr.length}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}