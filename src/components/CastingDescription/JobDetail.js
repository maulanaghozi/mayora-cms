import React from 'react';
import List from './List';
import moment from 'moment';

export default function JobDetail(props) {
    return (
        <>
            <List
                title={'Casting Type :'}
                value={props.data.type || '-'}
            />
            <List
                title={'Production Type :'}
                value={props.data.production_type || '-'}
            />
            <List
                title={'Title :'}
                value={props.data.title || '-'}
            />
            <OptionalList
                type={props.data.type}
                title={'Role :'}
                value={props.data.job_role || '-'}
            />
            <OptionalList
                type={props.data.type}
                title={'Gender :'}
                value={
                    (
                        Array.isArray(props.data.gender) &&
                        props.data.gender.length > 0
                    ) ?
                    props.data.gender.join(', ') :
                    '-'
                }
            />
            <OptionalList
                type={props.data.type}
                title={'Age :'}
                value={
                    (props.data.min_age && props.data.max_age) ?
                    `${props.data.min_age} - ${props.data.max_age} tahun` :
                    '-'
                }
            />
            <List
                title={'Description :'}
                value={props.data.description || '-'}
            />
            <List
                title={'Due Date :'}
                value={
                    props.data.due_date_open ?
                    'open' :
                    (
                        props.data.due_date ?
                        moment.unix(props.data.due_date).format('DD MMM YYYY') :
                        '-'
                    )
                }
            />
            <OptionalList
                type={props.data.type}
                title={'Shooting Date :'}
                value={
                    props.data.shooting_date_tbc ?
                    'tbc' :
                    (
                        props.data.shooting_date ?
                        moment.unix(props.shooting_date).format('DD MMM YYYY') :
                        '-'    
                    )
                }
            />
            <OptionalList
                type={props.data.type}
                title={'Shooting Location :'}
                value={
                    (
                        Array.isArray(props.data.location) &&
                        props.data.location.length > 0
                    ) ?
                    props.data.location.join(', ') :
                    '-'
                }
            />
        </>
    )
}

const OptionalList = (props) => {
    return (
        <>
            {
                (props.type === 'kestingrum') &&
                <List {...props} />
            }
        </>
    )
}