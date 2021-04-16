import React, { useRef, useState } from 'react';
import style from './SmallCastingViewer.module.scss';
import moment from 'moment';
import {MiniCalendarIcon} from '../../assets/image'
import {Link} from 'react-router-dom';

export default function SmallCastingViewer(props) {
    return (
        <div className={style.container}>
            <Title data={props.data}/>
            <Properties data={props.data}/>
            <Description data={props.data}/>
        </div>
    )
}

const Title = props => {
    return (
        <div className={style.title}>
            <div className={style.thumbnail}>
                <img src={
                    props.data.thumbnail ?
                    props.data.thumbnail.thumbnail_url :
                    'fallback_url'
                    // <TODO> add fallback url
                } />
            </div>
            <div className={style.title_container}>
                <div className={style.casting_title}>
                    {props.data.title}
                </div>
                <div className={style.casting_production_type}>
                    {props.data.production_type}
                </div>
                <div className={style.casting_due_date}>
                    <MiniCalendarIcon
                        width={15}
                        height={15}
                    />
                    <div>
                        {
                            props.data.due_date_open === 1 ?
                            'Open due date' :
                            moment.unix(props.data.due_date)
                            .fromNow(true).toUpperCase() + ' LEFT'
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const Properties = props => {
    return (
        <div className={style.properties}>
            <PropList
                type={'Role'}
                value={
                    props.data.type === 'kestingrum' &&
                    props.data.job_role
                }
            />
            <PropList
                type={'Gender'}
                value={
                    props.data.type === 'kestingrum' ?
                    props.data.gender.join(', ') :
                    '-'
                } 
            />
            <PropList
                type={'Umur'}
                value={
                    (
                        props.data.min_age &&
                        props.data.max_age &&
                        props.data.type === 'kestingrum'
                    ) &&
                    (
                        props.data.min_age + ' - ' +
                        props.data.max_age + ' tahun'
                    )
                }
            />
            <PropList
                type={'Deadline'}
                value={
                    props.data.due_date_open === 1 ?
                    'Open' :
                    (
                        props.data.due_date &&
                        moment.unix(props.data.due_date)
                        .format('DD MMMM YYYY')
                    )
                }
            />
            <PropList
                type={'Tanggal Shooting'}
                value={
                    (
                        props.data.shooting_date_start &&
                        props.data.shooting_date_end &&
                        props.data.type === 'kestingrum'
                    ) &&
                    (moment(props.data.shooting_date_start)
                    .format('DD MMMM YYYY') +
                    ' - ' +
                    moment(props.data.shooting_date_end)
                    .format('DD MMMM YYYY'))
                }
            />
            <PropList
                type={'Lokasi Shooting'}
                value={
                    props.data.type === 'kestingrum' &&
                    Array.isArray(props.data.location) && props.data.location.join(', ')
                }
            />
        </div>
    )
}

const PropList = props => {
    return (
        <div className={style.prop_list}>
            <div className={style.type}>{props.type}</div>
            <div className={style.value} title={props.value || ''}>
                <span className={style.colon}>{': '}</span>
                {props.value || '-'}
            </div>
        </div>
    )
}

const Description = props => {
    const boxRef = useRef(null);
    const checkIfTextOverflow = () => {
        if (boxRef.current) {
            return boxRef.current.scrollHeight > boxRef.current.offsetHeight;
        } else {
            return false;
        }
    }

    return (
        <>
            <div
                className={style.description}
                ref={boxRef}
            >
                {props.data.description || 'No description yet'}
                {
                    checkIfTextOverflow() &&
                    <Link
                        to={'/casting/detail/' + props.data.casting_id}
                        className={style.more_detail}
                    >
                        ... Lebih detail
                    </Link>
                }
            </div>
        </>
    )
}