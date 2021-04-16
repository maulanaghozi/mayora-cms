import React, { useState, useEffect } from 'react';
import {
    PieChart, Tooltip, Pie, Cell, Label,
    Legend, Area, ResponsiveContainer, Text
} from 'recharts';
import numeral from 'numeral';
import { useAlert } from 'react-alert';

import { http } from '../../../utility/http';
import { capitalize } from '../../../utility/utility';

import {
    general_container, legend_diamond, legend_percentage,
    legend_text, legend_value, legend_item, middle_label,
    secondary_label
} from './UserClassification.module.scss';

export default function GeneralClassification() {
    const [data, setData] = useState([
        {type: '', value: 0},
        {type: 'talent', value: 20},
        {type: 'recruiter', value: 10},
    ]);

    const [total, setTotal] = useState(30)

    const alert = useAlert();

    useEffect(() => {
        http({
            method: 'GET',
            path: 'profiles/summary/total-user-by-type'
        })
        .then(result => {
            if (result && result.code === 'success') {
                let total = 0;

                result.payload.forEach(entry => {
                    total += entry.value;
                })
                setData([
                    {type: '', value: 0},
                    ...result.payload
                ]);
                setTotal(total)
            } else {
                alert.error('fetch data failed!')
            }
        })
    }, []);

    const renderTotal = props => {
        const {cx, cy} = props;

        return (
            <g>
                <text
                    x={cx} y={cy} dy={-8}
                    textAnchor={'middle'}
                    className={middle_label}
                >
                    <tspan x={'50%'}>
                        {
                            total < 1000 ?
                            numeral(total).format('0') :
                            numeral(total).format('0.0a')
                        }
                    </tspan>
                    <tspan
                        x={'50%'} dy={'1.5rem'}
                        className={secondary_label}
                    >
                        User
                    </tspan>
                </text>
            </g>
        )
    }

    return (
        <div className={general_container}>
            <ResponsiveContainer
                width={'100%'}
                height={'100%'}
            >
                <PieChart>
                    <Pie
                        data={data}
                        dataKey={'value'}
                        nameKey={'type'}
                        cx="50%"
                        cy="50%"
                        innerRadius={'75%'}
                        outerRadius={'95%'}
                        activeIndex={0}
                        activeShape={renderTotal}
                    >
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.type === 'talent' ? '#00aaef' : '#7b368f'}/>
                            ))
                        }
                    </Pie>
                    <Legend
                        verticalAlign={'bottom'}
                        iconType={'square'}
                        iconSize={'0.8rem'}
                        layout={'vertical'}
                        wrapperStyle={{whiteSpace: 'nowrap', transform: 'translateY(1rem)'}}
                        payload={(() => {
                            let payload = [];

                            data.forEach((entry, index) => {
                                if(index === 0) {
                                    return false;
                                } else {
                                    payload[index - 1] = {
                                        value: entry.value,
                                        type: 'square',
                                        color: entry.type === 'talent' ? '#00aaef' : '#7b368f',
                                        id: entry.type,
                                        percent: entry.value / total
                                    }
                                }
                            })

                            return payload;
                        })()}
                        formatter={(value, entry, index) => (
                            <div className={legend_item}>
                                    <span className={legend_text}>
                                        {capitalize(entry.id)}
                                    </span>
                                    <span className={legend_diamond}>
                                        ◆
                                    </span>
                                    <span className={legend_percentage}>
                                        {Math.round(entry.percent * 10000) / 100 + '%'}
                                    </span>
                                    <div className={legend_value}>
                                        {`\n${entry.value}`}
                                    </div>
                            </div>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}