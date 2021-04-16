import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { http } from '../../../../utility/http';

import {
    card_container, content_container, card_title,
    card_total, card_diff, card_icon
} from './TotalCard.module.scss';

/**Card for total user, job and group on kestingrum dashboard  */
export default function TotalCard(props) {
    const [data, setData] = useState({
        total: 0,
        diff: 0
    });

    useEffect(() => {
        http({
            method: 'GET',
            path: props.apiUrl,
            query: {
                by: props.range
            }
        })
        .then(result => {
            if(result && result.code === 'success') {
                setData(result.payload);
            }
        })
    }, [props.range]);

    return (
        <div className={card_container}>
            <props.Icon className={card_icon} />
            <div className={content_container}>
                <div className={card_title}>{props.title.toUpperCase()}</div>
                <div className={card_total}>{data.total}</div>
                <div className={card_diff}>{'+ ' + data.diff + ' by ' + props.range}</div>
            </div>
        </div>
    )
}

TotalCard.propTypes = {
    /**Card's title */
    title: PropTypes.string.isRequired,

    /**API URL for fetching data */
    apiUrl: PropTypes.string.isRequired,

    range: PropTypes.oneOf(['day', 'week', 'month']).isRequired,

    /**Card's Icon, must be ReactComponent from image */
    Icon: PropTypes.elementType.isRequired
}