import React from 'react';
import { table_cell, column_type, to_member } from '../GroupTable.module.scss';
import { replaceString } from '../../../utility/utility';
import { Link } from 'react-router-dom';
import { ReactComponent as ChevronRight } from '../../../assets/chevron_right.svg';

export default function TypeMember(props) {
    return (
        <div className={table_cell + ' ' + column_type}>
            <div style={{userSelect: 'none'}}>
                <span>{props.row.type === 'open' ? 'Open Group' : 'Private Group'}</span><br />
                <Link
                    to={{
                        pathname:
                            '/group/' +
                            replaceString(
                                props.row.name,
                                ' ',
                                '-'
                            ) +
                            '/view-member',
                        state: {
                            data: props.row
                        }
                    }}
                    className={to_member}
                >
                    {props.row.member_count + ' Member'}<ChevronRight />
                </Link>
            </div>
        </div>
    )
}
