import React, { useState } from 'react';
import classNames from 'classnames';

import MasterTableRow from './MasterTableRow';

import { ReactComponent as SortIcon } from '../../../assets/chevron_down_blue.svg';

import {
    table_container, table_header, table_cell, column_header,
    column_type, table_body
} from './MasterTable.module.scss';

export default function MasterTable(props) {
    const [tableIsEditing, setTableIsEditing] = useState(false);

    const handleSort = () => {
        props.setIsAscending(!props.isAscending);
    }

    return (
        <div className={table_container}>
            <div className={table_header}>
                <div className={classNames(table_cell, column_header)}>
                    <span>No.</span>
                </div>
                <div onClick={handleSort} className={classNames(table_cell, column_type)}>
                    <span>{props.type}</span>
                    <SortIcon transform={'scale(1,' + (props.isAscending ? '1)':'-1)')} />
                </div>
                <div className={classNames(table_cell, column_header)}>
                    <span>Action</span>
                </div>
            </div>
            <div className={table_body}>
                {props.masterData && props.masterData.map((row, index, arr) => (
                    <MasterTableRow
                        key={row.id}
                        index={index}
                        attribute={props.attribute}
                        fetchMasterData={props.fetchMasterData}
                        type={props.type}
                        data={row}
                        apiUrl={props.apiUrl}
                        tableIsEditing={tableIsEditing}
                        setTableIsEditing={setTableIsEditing}
                    />
                ))}
            </div>
        </div>
    )
}
