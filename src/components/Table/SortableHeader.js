import React, {useState} from 'react';
import { ReactComponent as SortIcon } from '../../assets/chevron_down_blue.svg';
import style from './Table.module.scss';
import classNames from 'classnames';

export default function SortableHeader (props) {
    const [order, setOrder] = useState('ASC');

    const handleSort = () => {
        let newOrder = 'ASC';

        if (isAscending()) {
            newOrder = 'DESC';
        }

        setOrder(newOrder);

        props.setCurrentSort(props.columnName);

        props.handleSort({
            sortBy: props.sortBy,
            order: newOrder
        })
    }

    const isAscending = () => {
        return order === 'ASC';
    }

    return (
        <div
            onClick={handleSort}
            className={classNames(
                style.table_cell,
                props.className,
                {[style.blue_header]: props.currentSort === props.columnName},
                style.cursor_pointer,
                props.className
            )}
        >
            <span>{props.columnName}</span>
            <SortIcon
                transform={
                    'scale(1,' +
                    (isAscending() ? '-1)' : '1)')
                }
            />
        </div>
    )
}