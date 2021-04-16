import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import useHeader from '../../../hooks/useHeader/useHeader';

import PageTitle from '../../../components/PageTitle/PageTitle';

import CastingAssets from '../../../components/CastingAssets/CastingAssets';
import CastingDescription from '../../../components/CastingDescription/CastingDescription';

import { ReactComponent as MoreIcon } from '../../../assets/more_horizontal.svg';
import style from './DetailCasting.module.scss';
import { http } from '../../../utility/http';
import { useAlert } from 'react-alert';
import Loading from '../../../components/Loading/Loading';

const DetailCasting = props => {
    useHeader({
        path: ['/casting', '/casting/'],
        title: ['Casting', props.data.title]
    })

    return (
        <div className={style.container}>
            <div className={style.header}>
                <PageTitle
                    title={['view casting']}
                    path={['/casting/']}
                    returnable={true}
                    backTo={'/casting'}
                />
                <MoreIcon />
            </div>
            <div className={style.body}>
                <div className={style.description}>
                    <CastingDescription
                        data={props.data}
                    />
                </div>
                <div className={style.assets}>
                    <CastingAssets
                        data={props.data}
                    />
                </div>
            </div>
        </div>
    )
}

export default () => {
    const [data, setData] = useState(null);
    const {id} = useParams();
    const alert = useAlert();
    useEffect(() => {
        http({
            method: 'GET',
            path: 'posting/casting/' + id
        }).then(result => {
            if (result && result.code === 'success') {
                setData(result.payload);
            } else {
                alert.error('failed to fetch casting data');
            }
        })
    }, []);
    
    return (
        <>
            {
                data ?
                <DetailCasting data={data} /> :
                <Loading />
            }
        </>
    )
}

