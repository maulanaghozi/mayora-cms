// dependency
import React, { useState, useEffect } from 'react'
import {
    BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
    Bar, ResponsiveContainer
} from 'recharts';
import { useAlert } from 'react-alert';

// utility
import { http } from '../../../utility/http';

// styles
import {
    barchart_container, x_axis_text
} from './ActiveJobs.module.scss';

/**
 * Stacked Bar Chart for Active Job(s)
 */
export default function ActiveJobsChart(props) {
    const [data, setData] = useState([{
        title: '',
        cast: 0,
        shortlist: 0,
        rejected: 0,
        pending: 0,
        thumbnail: {
            thumbnail_url: ''
        }
    }])

    const [thumbnailHash, setThumbnailHash] = useState({});

    const alert = useAlert();

    // get data on mount
    useEffect(() => {
        http({
            method: 'GET',
            path: 'posting/summary/active-casting',
        })
        .then(result => {
            if (result && result.code === 'success') {
                const modified = modifyResult(result.payload.rows);
                setThumbnailHash(modified.hash);
                setData(modified.data);
            } else {
                alert.error('fetch data failed!');
            }
        }) 
    }, []);

    const modifyResult = data => {
        const hash = {};
        const newData = data.slice();

        newData.forEach((entry, index) => {
            entry.shooting = entry.cast;
            entry.terdaftar = entry.pending;

            delete entry.cast;
            delete entry.pending;

            hash[entry.title] = {thumbnail_url: entry.thumbnail.thumbnail_url, index: index};
        });

        return {hash, data: newData};
    }

    return (
        <div className={barchart_container}>
            <ResponsiveContainer
                width='100%'
                height={data.length * 62}
            >
                <BarChart
                    layout={'vertical'}
                    data={data}
                    barCategoryGap={52}
                    barSize={10}
                    margin={{
                      top: 20, right: 30, left: 170, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis type='number' />
                    <YAxis
                        type='category'
                        dataKey='title'
                        tick={
                            props => {
                                let pic = thumbnailHash[props.payload.value] || {thumbnail_url: '', index: 0}

                                return (
                                    <g>
                                        <React.Fragment>
                                            <image
                                                width={61}
                                                height={32}
                                                y={props.y - 15}
                                                href={pic.thumbnail_url}
                                                alignmentBaseline={'central'}
                                            />
                                            <foreignObject
                                                width={130}
                                                height={30}
                                                x={71}
                                                y={props.y - 15}
                                                alignmentBaseline={'central'}
                                            >
                                                <p className={x_axis_text}>
                                                    {props.payload.value}
                                                </p>
                                            </foreignObject>
                                        </React.Fragment>
                                    </g>
                                )
                            }
                        }
                    />
                    <Tooltip />
                    {props.status.map((stat, index) => (
                        <Bar dataKey={stat} stackId={'a'} fill={props.colors[index]} key={index} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}