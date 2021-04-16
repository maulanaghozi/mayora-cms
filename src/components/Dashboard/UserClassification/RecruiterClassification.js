import React, {useState, useEffect} from 'react';
import { useAlert } from 'react-alert';

import { http } from '../../../utility/http';
import Loading from '../../Loading/Loading';

import PieChart from './PieChart';
import {
    recruiter_container, title, symbol,
    inline_block, type, percentage, row,
    half_container
} from './UserClassification.module.scss'
import { unshift } from '../../../utility/utility';

const colors = [
    '#5a1b8f',
    '#973490',
    '#ff9dc3',
    '#ae73a9',
    '#ef7468',
    '#f3a540',
    '#766cbc'
]
export default function RecruiterClassification() {
    const [data, setData] = useState(null);

    const [total, setTotal] = useState(10);

    const alert = useAlert();

    useEffect(() => {
        http({
            method: 'GET',
            path: 'profiles/summary/total-recruiter-by-type'
        })
        .then(result => {
            if (result && result.code === 'success') {
                let sum = 0;

                result.payload.forEach(entry => {
                    sum += entry.value;
                });

                setTotal(sum);
                setData(unshift(result.payload, {name: '', value: 0}));
            } else {
                alert.error('fetch data failed!');
            }
        })
    }, [])

    return (
        <div className={recruiter_container}>
            {
                data ?
                <>
                    <div className={title}>Recruiter</div>
                    <div className={half_container}>
                        <PieChart
                            data={data} 
                            colors={colors}
                            labelData={total}
                            primaryLabel={''}
                            secondaryLabel={'Recruiter'}
                        />
                    </div>
                    {
                        data && data.map((entry, index) => (
                            index > 0 &&
                            <div className={row} key={index}>
                                <div className={symbol} style={{backgroundColor: colors[index - 1]}}></div>
                                <div className={inline_block}>
                                    <div className={type}>
                                        {entry.name}
                                    </div>
                                    <div className={percentage}>
                                        {
                                            (entry.value >= 0 && total > 0) ?
                                            Math.round(entry.value / total * 10000) / 100 + '%' :
                                            '0%'
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </>
            : <Loading />}
        </div>
    )
}
