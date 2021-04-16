import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert';

import style, { footer } from './Promo.module.scss'
import { http } from '../../../utility/http'

import CountSelector from '../../../components/CountSelector/CountSelector'
import PageSelector from '../../../components/PageSelector/PageSelector'
import PageCounter from '../../../components/PageCounter/PageCounter'
import PromoFilter from '../../../components/PromoFilter/PromoFilter'
import PromoTable from '../../../components/PromoTable/PromoTable'

import useHeader from '../../../hooks/useHeader/useHeader'

export default function HomeContent() {
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [status, setStatus] = useState([]);
    const [publishedDateStart, setPublishedDateStart] = useState(null);
    const [publishedDateEnd, setPublishedDateEnd] = useState(null);
    const [sortBy, setSortBy] = useState('title');
    const [order, setOrder] = useState('ASC');
    const [key, setKey] = useState(0);

    const [result, setResult] = useState('');
    const alert = useAlert();

    const searchCriteria = {
        page,
        rows,
        keyword,
        status,
        publishedDateStart,
        publishedDateEnd,
        sortBy,
        order,
        key
    }

    const setter = {
        page: setPage,
        rows: setRows,
        keyword: setKeyword,
        status: setStatus,
        publishedDateStart: setPublishedDateStart,
        publishedDateEnd: setPublishedDateEnd,
        sortBy: setSortBy,
        order: setOrder,
        key: setKey
    }

    const setSearchCriteria = newCriteria => {
        for (let key in newCriteria) {
            if (searchCriteria.hasOwnProperty(key)) {
                setter[key](newCriteria[key]);
            }
        }
    }

    useHeader({
        title: ['Home Content', 'Promo'],
        path: ['/home-content/promo', '/home-content/promo']
    })

    useEffect(() => {
        getPromoData(searchCriteria)
    }, [
        page,
        rows,
        keyword,
        status,
        publishedDateStart,
        publishedDateEnd,
        sortBy,
        order,
        key
    ])

    const getPromoData = async criteria => {
        const {
            key,
            page,
            rows,
            sortBy,
            order,
            ...searchParams
        } = criteria;

        const params = {
            method: 'get',
            path: 'promotion/promo/search',
            query: {
                page,
                rows,
                sortBy,
                order
            }
        }

        for (let key in searchParams) {
            if (
                (
                    Array.isArray(searchParams[key]) &&
                    searchParams[key].length > 0
                ) ||
                (
                    typeof searchParams[key] === 'string' &&
                    searchParams[key]
                ) ||
                typeof searchParams[key] === 'number' ||
                typeof searchParams[key] === 'object'
            ) {
                params.query[key] = searchParams[key];
            }
        }

        const result = await http(params);

        if (result && result.code === 'success') {
            setResult(result);
        } else {
            alert.error('fetch data failed!');
        }
    }

    return (
        <React.Fragment>
            <PromoFilter
                searchCriteria={searchCriteria}
                handleSearchCriteriaChange={setSearchCriteria}
            />
            <PromoTable
                data={result.payload}
                onChange={setSearchCriteria}
                sort={searchCriteria.sort}
                setKey={
                    () => setSearchCriteria(
                        {key: searchCriteria.key + 1}
                    )
                }
            />
            <div className={footer}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CountSelector setRow={rows => {setSearchCriteria({rows})}} />
                    <PageCounter className={style.page_counter} searchCriteria={searchCriteria} result={result.payload} />
                </div>
                <PageSelector result={result.payload} setPage={page => {setSearchCriteria({page})}} />
            </div>
        </React.Fragment>
    )
}
