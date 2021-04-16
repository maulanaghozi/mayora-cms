import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import {debounce} from 'throttle-debounce';
import useHeader from '../../hooks/useHeader/useHeader';
import style from './Casting.module.scss';

import AddBotton from '../../components/AddButton/AddButton';
import PageTitle from '../../components/PageTitle/PageTitle';
import CastingFilter from '../../components/CastingFilter/CastingFilter';
import CastingTable from '../../components/CastingTable/CastingTable';

import { http } from '../../utility/http';
import moment from 'moment';
import Pagination from '../../components/Pagination/Pagination';

const searchAttributes = [
    'keyword',
    'type',
    'production_type',
    'job_role',
    'location',
    'due_date_start',
    'due_date_end',
    'minimum_fee',
    'gender',
    'min_age',
    'max_age',
    'min_height',
    'max_height',
    'min_weight',
    'max_weight',
    'experience',
    'status'
]

const initialState = {
    page: 1,
    rows: 10
}

searchAttributes.forEach(key => {
    initialState[key] = null;
})

export default function CastingList() {
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);
    const [keyword, setKeyword] = useState(null);
    const [type, setType] = useState(null);
    const [production_type, setProductionType] = useState(null);
    const [job_role, setJobRole] = useState(null);
    const [location, setLocation] = useState(null);
    const [due_date_start, setDueDateStart] = useState(null);
    const [due_date_end, setDueDateEnd] = useState(null);
    const [minimum_fee, setMinimum_fee] = useState(null);
    const [gender, setGender] = useState(null);
    const [min_age, setMinAge] = useState(null);
    const [max_age, setMaxAge] = useState(null);
    const [min_height, setMinHeight] = useState(null);
    const [max_height, setmaxHeight] = useState(null);
    const [min_weight, setMinWeight] = useState(null);
    const [max_weight, setMaxWeight] = useState(null);
    const [experience, setExperience] = useState(null);
    const [status, setStatus] = useState(null);
    const [sortBy, setSortBy] = useState('created_at');
    const [order, setOrder] = useState('ASC');
    const [key, setKey] = useState(1);

    const searchCriteria = {
        page,
        rows,
        keyword,
        type,
        production_type,
        job_role,
        location,
        due_date_start,
        due_date_end,
        minimum_fee,
        gender,
        min_age,
        max_age,
        min_height,
        max_height,
        min_weight,
        max_weight,
        experience,
        status,
        sortBy,
        order,
        key
    }

    const setter = {
        page: setPage,
        rows: setRows,
        keyword: setKeyword,
        type: setType,
        production_type: setProductionType,
        job_role: setJobRole,
        location: setLocation,
        due_date_start: setDueDateStart,
        due_date_end: setDueDateEnd,
        minimum_fee: setMinimum_fee,
        gender: setGender,
        min_age: setMinAge,
        max_age: setMaxAge,
        min_height: setMinHeight,
        max_height: setmaxHeight,
        min_weight: setMinWeight,
        max_weight: setMaxWeight,
        experience: setExperience,
        status: setStatus,
        sortBy: setSortBy,
        order: setOrder,
        key: setKey,
    }

    const setSearchCriteria = newCriteria => {
        for (let key in newCriteria) {
            setter[key](newCriteria[key]);
        }
    }

    const [dataCasting, setDataCasting] = useState('');

    useEffect(() => {
        debouncedGetCasting(searchCriteria);
    }, [
        page,
        rows,
        keyword,
        type,
        production_type,
        job_role,
        location,
        due_date_start,
        due_date_end,
        minimum_fee,
        gender,
        min_age,
        max_age,
        min_height,
        max_height,
        min_weight,
        max_weight,
        experience,
        status,
        sortBy,
        order,
        key
    ]);

    const alert = useAlert();

    useHeader({
        path: ['/casting'],
        title: ['Casting']
    })

    const getCasting = criteria => {
        const params = {
            method: 'GET',
            path: 'posting/casting/search',
            query: {
                page: criteria.page,
                rows: criteria.rows,
                sortBy: criteria.sortBy,
                order: criteria.order
            }
        }

        searchAttributes.map(key => {
            if (
                criteria[key] !== null &&
                criteria[key] !== undefined &&
                criteria[key] !== ''
            ) {
                if (
                    key === 'due_date_start' ||
                    key === 'due_date_end'
                ) {
                    params.query[key] = moment(criteria[key]).unix();
                } else {
                    params.query[key] = criteria[key];
                }
            }
        });

        http(params)
        .then(result => {
            if (result && result.code === 'success') {
                setDataCasting(result.payload);
            } else {
                alert.error('failed to fetch casting');
            }
        })
    }

    const debouncedGetCasting = debounce(200, getCasting);

    return (
        <div className={style.container}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <PageTitle
                    title={['casting job list']}
                    path={['/casting']}
                    returnable={false}
                    backTo={'clicked'}
                />
                <AddBotton
                    text={'New Casting'}
                    to={'/casting/create'}
                />
            </div>
            <CastingFilter
                handleSearchCriteriaChange={setSearchCriteria}
                searchCriteria={searchCriteria}
            />
            <CastingTable
                data={dataCasting.rows}
                searchCriteria={searchCriteria}
                handleSearchCriteriaChange={setSearchCriteria}
                setKey={() => setSearchCriteria({
                    key: key + 1
                })}
            />
            <Pagination
                data={dataCasting}
                searchCriteria={searchCriteria}
                setSearchCriteria={setSearchCriteria}
            />
        </div>
    )
} 