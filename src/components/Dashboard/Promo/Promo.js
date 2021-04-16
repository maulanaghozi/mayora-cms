import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import ScrollContainer from 'react-indiana-drag-scroll';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import PromoCard from './PromoCard';
import { ReactComponent as CekidotIcon } from '../../../assets/cekidot.svg'
import {
    promo_container, promo_header, selector,
    title, selected, promo_subheader, promo_list,
    card_container, grabbing
} from './Promo.module.scss'
import { http } from '../../../utility/http';
import { useAlert } from 'react-alert';
import DashboardTitle from '../DashboardTitle';

export default function Promo() {
    const [status, setStatus] = useState('ongoing');
    const [isGrabbing, setIsGrabbing] = useState(false);
    const [data, setData] = useState([{
        pic_url: '',
        description: '',
        startDate: '',
        endDate: ''
    }]);

    const alert = useAlert();

    useEffect(() => {
        const params = {
            method: 'GET'
        }

        if (status === 'ongoing') {
            params.path = 'promotion/promo/'
        } else {
            params.path = 'promotion/promo/upcoming'
        }
        
        http(params)
        .then(result => {
            if (result && result.code === 'success') {
                setData(result.payload);
            } else {
                alert.error('fetch data failed!');
            }
        })
    }, [status])

    const handleStatusChange = e => {
        if(e.target.id !== status) {
            setStatus(e.target.id);
        }
    }

    const handleStartScroll = () => {
        setIsGrabbing(true)
    }
    const handleEndScroll = () => {
        setIsGrabbing(false)
    }
    return (
        <div className={promo_container}>
            <div className={promo_header}>
                <DashboardTitle
                    title={'Promo'}
                    to={'/home-content/promo'}
                />
                <span className={selector}>
                    <span
                        id={'ongoing'}
                        className={classNames({[selected]: status === 'ongoing'})}
                        onClick={handleStatusChange}
                    >
                        {'Ongoing'}
                    </span>
                    <span
                        id={'upcoming'}
                        className={classNames({[selected]: status === 'upcoming'})}
                        onClick={handleStatusChange}
                    >
                        {'Upcoming'}
                    </span>
                </span>
            </div>
            <div className={promo_subheader}>
                <span>{data.length + ' ' + status + ' promos'}</span>
            </div>
            <ScrollContainer
                className={classNames(promo_list, {[grabbing]: isGrabbing})}
                onStartScroll={handleStartScroll}
                onEndScroll={handleEndScroll}
            >
                {data.map((entry, index) => (
                    <div className={card_container} key={index}>
                        <PromoCard data={entry} />
                    </div>
                ))}
            </ScrollContainer>
        </div>
    )
}