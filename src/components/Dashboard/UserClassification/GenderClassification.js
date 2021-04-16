import React, { useState, useEffect } from 'react';
import classNames from 'classnames'
import { useAlert } from 'react-alert';

import { http } from '../../../utility/http';

import femaleIcon from '../../../assets/female_icon.svg';
import maleIcon from '../../../assets/male_icon.svg';

import {
    gender_container, female, male,
    gender_chart, icon, gender_count, subtitle
} from './UserClassification.module.scss';

export default function GenderClassification() {
    const [data, setData] = useState(null)

    const alert = useAlert();

    useEffect(() => {
        http({
            method: 'GET',
            path: 'profiles/summary/total-talent-by-gender',
        })
        .then(result => {
            if (result && result.code === 'success') {
                setData(result.payload);
            } else {
                alert.error('fetch data failed!')
            }
        })

    }, [])
    return (
        <div className={gender_container}>
            <div className={classNames(gender_chart, female)}>
                <img className={icon} src={femaleIcon} alt={'Female'} />
                <div>
                    <div className={subtitle}>Female</div>
                    <div className={gender_count}>
                        {
                            data ?
                            data.female :
                            '-'
                        }
                    </div>
                </div>
            </div>
            <div className={classNames(gender_chart, male)}>
                <img className={icon} src={maleIcon} alt={'Male'} />
                <div>
                    <div className={subtitle}>Male</div>
                    <div className={gender_count}>
                        {
                            data ?
                            data.male:
                            '-'
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}