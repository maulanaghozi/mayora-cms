import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';

import { http } from '../../../utility/http';

import DashboardTitle from '../DashboardTitle';
import ReportCard from '../../ReportList/ReportCard/ReportCard';

import { mockData } from './mockData';

import {
    report_container, list_container
} from './ReportList.module.scss';

export default function ReportList() {
    const [data, setData] = useState(null);

    const alert = useAlert();

    useEffect(() => {
        http({
            method: 'GET',
            path: 'posting/report/search',
            query: {
                page: 1,
                rows: 20,
                sortBy: 'created_at',
                order: 'DESC'
            }
        })
        .then(result => {
            if (result && result.code === 'success') {
                setData(result.payload.rows);
            } else {
                alert.error('fetch data failed!');
            }
        })
    }, []);

    return (
        <div className={report_container}>
            <DashboardTitle
                title={'Report List'}
                to={'/report'}
            />
            <div className={list_container}>
                {data && data.map((report, index) => (
                    <ReportCard
                        key={index}
                        data={report}
                        type={'small'}
                    />
                ))}
            </div>
        </div>
    )
}
