import React, { useState, useEffect } from 'react';
import {
    AreaChart, XAxis, YAxis, CartesianGrid, Tooltip,
    Area, ResponsiveContainer
} from 'recharts';
import classNames from 'classnames';
import moment from 'moment';

import { capitalize } from '../../../../utility/utility';

import {
    chart_container, chart_title, chart,
    range_options, chart_header, selected,
    legend_text, circle_blue, circle_purple,
    chart_legend
} from './UserJoinChart.module.scss';
import { http } from '../../../../utility/http';

import { mockData } from './mockData';

import InputDateRange from '../../../InputDateRange/InputDateRange';
import {useAlert} from 'react-alert';

const options = [
    'day',
    'week',
    'month'
]

let yearSet = new Set();

export default function UserJoinChart(props) {
    const [data, setData] = useState([{
        date: 0,
        talent: 0,
        recruiter: 0,
    }]);

    const [startDate, setStartDate] = useState(moment().subtract(7, 'weeks').toDate());
    const [endDate, setEndDate] = useState(new Date());
    const alert = useAlert();

    useEffect(() => {
        moment.updateLocale(moment.locale(), { invalidDate: 'Select Date' });
        
        http({
            method: 'GET',
            path: 'profiles/summary/user-join',
            query: {
                from: moment(startDate).unix(),
                to: moment(endDate).unix(), 
                range: props.range
            }
        })
        .then(result => {
            yearSet.clear();
            if (result && result.code === 'success') {
                setData(result.payload);
            } else {
                alert.error('fetch data failed!');
                if(process.env.NODE_ENV === 'development') {
                    setData(mockData(moment(startDate).unix(), moment(endDate).unix(), props.range));
                }
            }
        })
    }, [props.range, startDate, endDate]);

    const handleSelectRange = e => {
        if(props.range !== e.target.id) {
            props.setRange(e.target.id);
        }
    }

    return (
        <div className={chart_container}>
            <Header
                range={props.range}
                handleSelectRange={handleSelectRange}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
            <div className={chart}>
                <ResponsiveContainer
                    width={'100%'}
                    height={'100%'}
                >
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id='colorTalent' x1='0' y1='0' x2='0' y2='1'>
                                <stop offset='55%' stopColor='#3a96fd' stopOpacity={0.1}/>
                                <stop offset='95%' stopColor='#2e5bff' stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id='colorRecruiter' x1='0' y1='0' x2='0' y2='1'>
                                <stop offset='55%' stopColor='#9d60fb' stopOpacity={0.2}/>
                                <stop offset='95%' stopColor='#2e5bff' stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey='date'
                            height={50}
                            strokeWidth={0.5}
                            stroke={'#97a4ba'}
                            style={{
                                fontFamily: 'Montserrat',
                                fontSize: '0.9rem'
                            }}
                            tick={<BottomTick range={props.range} />}
                        />
                        <XAxis
                            orientation={'top'}
                            xAxisId='top'
                            dataKey='date'
                            strokeWidth={0.5}
                            stroke={'#97a4ba'}
                            style={{
                                fontFamily: 'Montserrat',
                                fontSize: '0.9rem'
                            }}
                            tick={<TopTick range={props.range} />}
                        />
                        <YAxis
                            stroke={'#97a4ba'}
                            strokeWidth={0.5}
                            style={{
                                fontFamily: 'Montserrat',
                                fontSize: '0.9rem'
                            }}
                        />
                        <CartesianGrid strokeWidth={0.5} strokeDasharray={'2 2'} stroke={'#e0e7ff'} />
                        <Tooltip
                            wrapperStyle={{
                                fontFamily: 'Montserrat'
                            }}
                            labelFormatter={value => {
                                let format = '';

                                switch (props.range) {
                                    case 'day':
                                    case 'week':
                                        format = 'DD MMM YYYY'
                                        break;
                                
                                    default:
                                        format = 'MMM YYYY'
                                        break;
                                }

                                return moment.unix(value).format(format);
                            }}
                        />
                        <Area
                            dataKey='talent'
                            stroke='#00aeef'
                            fillOpacity={1}
                            strokeWidth={2}
                            dot={{fill: 'white'}}
                            fill='url(#colorTalent)'
                            // isAnimationActive={false}
                        />
                        <Area
                            dataKey='recruiter'
                            stroke='#7b368f'
                            fillOpacity={1}
                            strokeWidth={2}
                            dot={{fill: 'white'}}
                            fill='url(#colorRecruiter)'
                            // isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

const BottomTick = ({
    payload: { value },
    verticalAnchor,
    visibleTicksCount,
    top,
    ...rest
}) => (
    <text>
        <tspan {...rest} className="bar-chart-tick" dy={'1rem'}>
            {moment.unix(value).format('MMM')}
        </tspan>
        {
            rest.range !== 'month' &&
            <tspan {...rest} className="bar-chart-tick" dy={'2rem'}>
                {moment.unix(value).format('DD')}
            </tspan>
        }
    </text>
);

const TopTick = ({
    payload: { value },
    verticalAnchor,
    visibleTicksCount,
    top,
    ...rest
}) => {
    let year = moment.unix(value).format('YYYY');
    if (yearSet.has(year)) {
        year = '';
    } else {
        yearSet.add(year);
    }
    return (
        <text>
            <tspan {...rest} className="bar-chart-tick" dy={0}>
                {year}
            </tspan>
        </text>
    )
};

const Header = props => {
    return (
        <div className={chart_header}>
            <div className={chart_title}>User Join</div>
            <div className={chart_legend}>
                <div className={legend_text}>
                    <div className={circle_blue}></div>
                    <span>Talent</span>
                </div>
                <span className={legend_text}>
                    <div className={circle_purple}></div>
                    <span>Recruiter</span>
                </span>
            </div>
            <div className={range_options}>
                {options.map((option, index) => (
                    <div
                        id={option}
                        className={classNames({[selected]: props.range === option})}
                        onClick={props.handleSelectRange}
                        key={index}
                    >
                        {capitalize(option)}
                    </div>
                ))}
            </div>
            <InputDateRange
                startDate={props.startDate}
                endDate={props.endDate}
                setStartDate={props.setStartDate}
                setEndDate={props.setEndDate}
                prefix={'Join Date: '}
                unclearable={true}
                maxDate={moment().endOf('day').toDate()}
            />
        </div>
    )
}