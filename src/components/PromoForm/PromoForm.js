import React from 'react';
import style from './PromoForm.module.scss';
import classNames from 'classnames';

import Title from './Title';
import Tag from './Tag';
import Description from './Description';
import InputDate from '../InputDate/InputDate';
import moment from 'moment';

export default function PromoForm(props) {
    const handleTitleChange = e => {
        if (e.target.name === 'title') {
            props.setPromo({title: e.target.value})
        }
    }

    const handleTagChange = newInputValue => {
        if (newInputValue) {
            props.setPromo({
                tag: newInputValue.map(entry => entry.value)
            })
        }
    }

    const handleDescriptionChange = (plain, raw) => {
        props.setPromo({
            plain_description: plain,
            raw_description: raw
        });
    }

    return (
        <div className={style.container}>
            <p className={style.tagline}>promo details</p>
            <Title
                handleTitleChange={handleTitleChange}
                title={props.promo.title}
            />
            <Tag
                handleTagChange={handleTagChange}
                tag={props.promo.tag}
            />
            <div className={style.container_form_published_date}>
                <div className={style.field_published_date}>
                    <span>{'Published Date :'}</span>
                </div>
                <div>
                    <InputDate
                        className={style.input_date_published_date}
                        value={props.promo.published_date_start}
                        onChange={newValue => {
                            const newDate = moment.unix(newValue);

                            if (
                                newDate
                                .isAfter(
                                    moment
                                    .unix(props.promo.published_date_end)
                                )
                            ) {
                                props.setPromo({
                                    published_date_start: newDate.unix(),
                                    published_date_end: null
                                });
                            } else {
                                props.setPromo({
                                    published_date_start: newDate.unix()
                                });

                            }
                        }}

                    />
                    <div className={style.input_date_published_date_separator} />
                    <InputDate
                        className={style.input_date_published_date}
                        value={props.promo.published_date_end}
                        minDate={moment.unix(props.promo.published_date_start).toDate()}
                        onChange={published_date_end => {
                            props.setPromo({published_date_end});
                        }}
                    />
                </div>
            </div>
            <Description    
                handleDescriptionChange={handleDescriptionChange}
                plainDescription={props.promo.plain_description}
                rawDescription={props.promo.raw_description}
            />
        </div>
    )
}