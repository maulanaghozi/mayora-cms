import React from 'react';
import { table_cell, column_created } from '../GroupTable.module.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function Created(props) {
    return (
        <div className={table_cell + ' ' + column_created}>
            <div>
                {(() => {
                    const creator = props.row.creator
                    return (
                        <>
                            <span style={{color: 'rgba(0, 0, 0, 0.4)'}}>by </span>
                            <Link
                                style={{textDecoration: 'none'}}
                                to={
                                    '/user/recruiter/' +
                                    creator.user_id
                                }
                            >
                                <span style={{color: '#000000', fontWeight: 500}}>
                                    {(creator.name || creator.username)}
                                </span>
                            </Link>
                        </>
                    )
                })()}
            </div>
            <div style={{marginTop: '7px'}}>
                {moment.unix(props.row.created_at).format('DD MMM YYYY, HH:mm:ss')}
            </div>
        </div>
    )
}
