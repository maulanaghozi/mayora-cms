import React from 'react';
import style from './Pagination.module.scss';
import CountSelector from '../CountSelector/CountSelector';
import PageCounter from '../PageCounter/PageCounter';
import PageSelector from '../PageSelector/PageSelector';

export default function Pagination(props) {
    return (
        <div className={style.footer}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <CountSelector className={style.count_selector} setRow={rows => {props.setSearchCriteria({rows}) }} />
                <PageCounter searchCriteria={props.searchCriteria} result={props.data} />
            </div>
            <PageSelector result={props.data} setPage={page => {props.setSearchCriteria({page})}} />
        </div>
    )
}
