import React from 'react';
import {
    PieChart, Tooltip, Pie, Cell, Label,
    Legend, Area, ResponsiveContainer, Text
} from 'recharts';

import {
    middle_label, secondary_label, age_chart
} from './UserClassification.module.scss';

export default function KestingPieChart(props) {
    const renderLabel = chartProps => {
        const {cx, cy} = chartProps;

        return (
            <g>
                <text
                    x={cx} y={cy} dy={-8}
                    textAnchor={'middle'}
                    className={middle_label}
                >
                    <tspan x={'50%'}>
                        {props.labelData + props.primaryLabel}
                    </tspan>
                    <tspan
                        x={'50%'} dy={'1.5rem'}
                        className={secondary_label}
                    >
                        {props.secondaryLabel}
                    </tspan>
                </text>
            </g>
        )
    }

    return (
        <div className={age_chart}>
            <ResponsiveContainer
                width={'100%'}
                height={150}
            >
                <PieChart>
                    <Pie
                        data={props.data}
                        dataKey={'value'}
                        nameKey={'name'}
                        cx="50%"
                        cy="50%"
                        innerRadius={'75%'}
                        outerRadius={'95%'}
                        activeIndex={0}
                        activeShape={renderLabel}
                        isAnimationActive={true}
                    >
                        {
                            props.data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={props.colors[index % props.colors.length]}
                                />
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}