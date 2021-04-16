import React, { useState } from 'react';
import style from './StaffPickTalentContainer.module.scss';
import {CheckBoxChecked, BlueLocationIcon} from '../../assets/image';
import NotFound from '../NotFound/NotFound';

export default function StaffPickTalentContainer(props) {
    const add = talent => {
        props.setSelectedTalent({
            ...props.selectedTalent,
            [talent.user_id]: talent
        })
    }

    const remove = talent => {
        props.setSelectedTalent({
            ...props.selectedTalent,
            [talent.user_id]: false
        })
    }

    return (
        <div className={style.container}>
            {
                (
                    Array.isArray(props.data) &&
                    props.data.length > 0
                ) ?
                props.data.map(talent => {
                    return (
                        <Card
                            key={talent.user_id}
                            data={talent}
                            add={add}
                            remove={remove}
                        />
                    )
                }) :
                <NotFound />
            }
        </div>
    )
}

const Card = props => {
    const [checked, setChecked] = useState(false);
    const onCheck = () => {
        if (checked){
            setChecked(false);
            props.remove(props.data);
        } else {
            setChecked(true);
            props.add(props.data);
        }
    }
    return (
        <div className={style.card_container}>
            <div
                className={style.card}
                style={{
                    backgroundImage: 'url(' + props.data.profile_pic_url + ')'
                }}
            >
                <div
                    className={style.checkbox_container}
                    onClick={onCheck}
                >
                    <div className={style.checkbox}>
                        {checked && <CheckBoxChecked />}
                    </div>
                </div>
            </div>
            <div className={style.footer}>
                <div className={style.name}>{props.data.name}</div>
                <div className={style.location}>
                    <BlueLocationIcon height={11} width={10} />
                    {props.data.location || '-'}
                </div>
            </div>
        </div>
    )
}