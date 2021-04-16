import React from 'react';
import classNames from 'classnames';
import { ReactComponent as CalenderIcon } from '../../../assets/calendar_line.svg'
import style from './PromoCard.module.scss';
import TextBoxEllipsis from '../../TextBoxEllipsis/TextBoxEllipsis';
import moment from 'moment';

export default function PromoCard(props) {
    return (
        <div className={style.card_container}>
            <div
                className={style.card_picture}
                style={{
                    backgroundImage: 'url(' + props.data.image_url + ')'
                }}
            />
            <TextBoxEllipsis
                backgroundColor={'white'}
                lineHeight={13}
                lineClamp={2}
                text={props.data.title}
                className={style.card_title}
            />
            <div className={classNames(style.card_date, style.text)}>
                <span className={style.icon}>
                    <CalenderIcon />
                </span>
                <span>
                    {
                        moment.unix(props.data.published_date_start).format('DD MMM YYYY') + ' - ' +
                        moment.unix(props.data.published_date_end).format('DD MMM YYYY')
                    }
                </span>
            </div>
        </div>
    )
}
