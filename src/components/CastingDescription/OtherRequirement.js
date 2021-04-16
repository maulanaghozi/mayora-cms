import React from 'react';
import List from './List';
import moment from 'moment';
import numeral from 'numeral';

numeral.register('locale', 'Rp', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    currency: {
        symbol: 'Rp '
    }
});

// switch between locales
numeral.locale('Rp');

export default function OtherRequirement(props) {
    const {
        wardrobe_date,
        workshop_date,
        fee,
        media,
        min_height,
        max_height,
        min_weight,
        max_weight,
        skin_color,
        hair_type,
        body_type,
        ethnicity,
        experience,
        skill
    } = props.data;

    return (
        <>
            <List
                title={'Wardrobe Date :'}
                value={
                    wardrobe_date ?
                    moment.unix(wardrobe_date).format('DD MMM YYYY') :
                    '-'
                }
            />
            <List
                title={'Workshop Date :'}
                value={
                    workshop_date ?
                    moment.unix(workshop_date).format('DD MMM YYYY') :
                    '-'
                }
            />
            <List
                title={'Fee :'}
                value={
                    fee ?
                    numeral(fee).format('$0,0.00'):
                    '-'
                }
            />
            <List
                title={'Media :'}
                value={media || '-'}
            />
            <List
                title={'Tinggi (cm) :'}
                value={
                    (min_height && max_height) ?
                    (min_height + ' - ' + max_height) :
                    '-'
                }
            />
            <List
                title={'Berat (kg) :'}
                value={
                    (min_weight && max_weight) ?
                    (min_weight + ' - ' + max_weight) :
                    '-'
                }
            />
            <List
                title={'Skin Color :'}
                value={
                    (
                        Array.isArray(skin_color) &&
                        skin_color.length > 0
                    ) ?
                    skin_color.map(value => value.skin_color).join(', ') :
                    '-'
                }
            />
            <List
                title={'Hair :'}
                value={
                    (
                        Array.isArray(hair_type) &&
                        hair_type.length > 0
                    ) ?
                    hair_type.join(', ') :
                    '-'
                }
            />
            <List
                title={'Body Type :'}
                value={
                    (
                        Array.isArray(body_type) &&
                        body_type.length > 0
                    ) ?
                    body_type.join(', ') :
                    '-'
                }
            />
            <List
                title={'Ethnicity :'}
                value={
                    (
                        Array.isArray(ethnicity) &&
                        ethnicity.length > 0
                    ) ?
                    ethnicity.join(', ') :
                    '-'
                }
            />
            <List
                title={'Experience :'}
                value={
                    (
                        Array.isArray(experience) &&
                        experience.length > 0
                    ) ?
                    experience.join(', ') :
                    '-'
                }
            />
            <List
                title={'Skill :'}
                value={
                    (
                        Array.isArray(skill) &&
                        skill.length > 0
                    ) ?
                    skill.join(', ') :
                    '-'
                }
            />
        </>
    )
}