import React, { useEffect, useState } from 'react';
import style from './CastingDescription.module.scss';
import classNames from 'classnames';

import JobDetail from './JobDetail';
import OtherRequirement from './OtherRequirement';

export default function CastingDescription(props) {
    const [page, setPage] = useState(0);

    return (
        <>
            <div className={style.navigation}>
                <div
                    className={classNames(
                        style.btn,
                        style.left,
                        {[style.active]: page === 0},
                        {[style.pointer]: props.data.type === 'kestingrum'}
                    )}
                    onClick={() => {
                        if (
                            page === 1 &&
                            props.data.type === 'kestingrum'
                        ) {
                            setPage(0);
                        }
                    }}
                >
                    <span>{'job details'}</span>
                    <div className={style.shadow}></div>
                </div>
                <div
                    className={classNames(
                        style.btn,
                        style.right,
                        {[style.active]: page === 1},
                        {[style.pointer]: props.data.type === 'kestingrum'}
                    )}
                    onClick={() => {
                        if (
                            page === 0 &&
                            props.data.type === 'kestingrum'
                        ) {
                            setPage(1)
                        }
                    }}
                >
                    <span>
                        {
                            (props.data.type === 'kestingrum') &&
                            'other requirement'
                        }
                    </span>
                </div>
            </div>
            <div className={style.description_container}>
                {
                    page ?
                    <OtherRequirement
                        data={props.data}
                    /> :
                    <JobDetail
                        data={props.data}
                    />
                }
            </div>
        </>
    )
}