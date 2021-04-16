import React, { useState, useEffect } from 'react';
import {useAlert} from 'react-alert';
import { http } from '../../utility/http';

import ReportFilter from './ReportFilter/ReportFilter'; 
import ReportCardList from './ReportCardList/ReportCardList'; 
import Pagination from '../Pagination/Pagination';

import style from './ReportList.module.scss';

export default function ReportList() {
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);
    const [keyword, setKeyword] = useState(null);
    const [parent_type, setParentType] = useState(null);
    const [sortBy, setSortBy] = useState('created_at');
    const [order, setOrder] = useState('DESC');
    const [key, setKey] = useState(0);
    const [reportData, setReportData] = useState(null);

    const alert = useAlert();

    const searchCriteria = {
        page,
        rows,
        keyword,
        parent_type,
        sortBy,
        order,
        key
    }

    const setter = {
        page: setPage,
        rows: setRows,
        keyword: setKeyword,
        parent_type: setParentType,
        sortBy: setSortBy,
        order: setOrder,
        key: () => {
            setKey(key + 1);
        }
    }

    const setSearchCriteria = newCriteria => {
        for (let key in newCriteria) {
            if (searchCriteria.hasOwnProperty(key)) {
                setter[key](newCriteria[key]);
            }
        }
    }

    useEffect(() => {
        fetchData(searchCriteria)
    }, [
        page,
        rows,
        keyword,
        parent_type,
        sortBy,
        order,
        key
    ]);

    const fetchData = searchCriteria => {
        const params = {
            method: 'GET',
            path: 'posting/report/search',
            query: {}
        }

        if (typeof searchCriteria.page === 'number' && searchCriteria.page > 0){
            params.query.page = searchCriteria.page;
        } else {
            params.query.page = 1;
        }

        if (typeof searchCriteria.rows === 'number' && searchCriteria.rows > 0){
            params.query.rows = searchCriteria.rows;
        } else {
            params.query.rows = 10;
        }

        if (searchCriteria.keyword && typeof searchCriteria.keyword === 'string') {
            params.query.keyword = searchCriteria.keyword;
        }

        if (Array.isArray(parent_type) && parent_type.length > 0) {
            params.query.parent_type = searchCriteria.parent_type;
        }

        if (searchCriteria.sortBy && typeof searchCriteria.sortBy === 'string') {
            params.query.sortBy = searchCriteria.sortBy;
        } else {
            params.query.sortBy = 'created_at';
        }

        if (searchCriteria.order === 'ASC' || searchCriteria.order === 'DESC') {
            params.query.order = searchCriteria.order;
        } else {
            params.query.order = 'DESC';
        }
        
        
        http(params)
        .then(result => {
            if(result && result.code === 'success') {
                setReportData(result.payload);
            } else {
                alert.error('fetch data failed!');
            }
        })
    }

    return (
        <div className={style.scrollable_container}>
            {
                reportData &&
                <>
                    <ReportFilter
                        searchCriteria={searchCriteria}
                        setSearchCriteria={setSearchCriteria}
                    />
                    <ReportCardList
                        data={reportData.rows}
                        setSearchCriteria={setSearchCriteria}
                    />
                    <Pagination
                        searchCriteria={searchCriteria}
                        setSearchCriteria={setSearchCriteria}
                        data={reportData}
                    />
                </>
            }
        </div>
    )
}
