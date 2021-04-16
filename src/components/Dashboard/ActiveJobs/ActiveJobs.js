import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ActiveJobsChart from './ActiveJobsChart';

import {
    active_jobs_container, active_jobs_header, title,
    legend, status_container, symbol, status_title
} from './ActiveJobs.module.scss'
import { capitalize } from '../../../utility/utility';
import DashboardTitle from '../DashboardTitle';

const status = [
    'shooting',
    'shortlist',
    'rejected',
    'terdaftar',
]

const colors = [
    '#60dddc',
    '#f8d148',
    '#f07c3a',
    '#7386ec'
]

export default function ActiveJobs() {
    return (
        <div className={active_jobs_container}>
            <div>
                <DashboardTitle
                    title={'Active Job(s)'}
                    to={'/casting'}
                />
                <ActiveJobsLegend />
            </div>
            <ActiveJobsChart status={status} colors={colors} />
        </div>
    )
}

function ActiveJobsLegend() {
    return (
        <span className={legend}>
            {status.map((stat, index, array) => (
                <span className={status_container} key={index}>
                    <div
                        className={symbol}
                        style={{backgroundColor: colors[colors.length - index - 1]}}
                    />
                    <span className={status_title}>{capitalize(array[array.length - index - 1])}</span>
                </span>
            ))}
        </span>
    )
}
