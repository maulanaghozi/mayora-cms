import React, {useState, useEffect} from 'react';
import { useAlert } from 'react-alert';

import { http } from '../../../utility/http';
import { getAverage, unshift } from '../../../utility/utility';

import GenderClassification from './GenderClassification';

import {
    talent_container, title, age_container, middle_label,
    secondary_label, legend_container, age_chart, symbol,
    diamond, percentage, range, gender_container,
    gender_chart, icon, gender_count, subtitle
} from './UserClassification.module.scss';
import PieChart from './PieChart';
import Loading from '../../Loading/Loading';

const colors = [
    '#ffffff', //dummy
    '#41a1b8',
    '#255b8a',
    '#6cb4f1',
    '#6236ff',
    '#44d7b6',
    '#aeaeae',
]

export default function TalentClassification() {
    const [data, setData] = useState(null);

    const [average, setAverage] = useState(null);
    const [total, setTotal] = useState(1)

    const alert = useAlert();

    useEffect(() => {
        http({
            method: 'GET',
            path: 'profiles/summary/total-talent-by-age'
        })
        .then(result => {
            if (result && result.code === 'success') {
                setAverage(result.payload.average);
                setData(unshift(result.payload.data, {name: '', value: 0}));
            } else {
                alert.error('fetch data failed!');
            }
        })
    }, []);

    return (
        <div className={talent_container}>
            <div className={title}>Talent</div>
            {
                data ?
                <div className={age_container}>
                    <PieChart
                        data={data}
                        colors={colors}
                        labelData={average}
                        primaryLabel={' yo'}
                        secondaryLabel={'Avg. age'}
                    />
                    <ul className={legend_container}>
                        {data.map((entry, index) => (
                            index > 0 &&
                            <li key={index}>
                                <div className={symbol} style={{backgroundColor: colors[index]}}></div>
                                <span className={range}>
                                    {entry.name}
                                </span>
                                <span className={diamond}>◆</span>
                                <span className={percentage}>
                                    {Math.round(entry.value * 10000) / 100 + '%'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div> :
                <Loading />
            }
            <GenderClassification />
        </div>
    )
}