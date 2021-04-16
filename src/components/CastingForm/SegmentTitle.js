import React from 'react';
import style from './CastingForm.module.scss';

export default props => {
    return (
        <div className={style.title_container}>
            <props.Icon
                width={28}
                height={28}
            />
            <div className={style.title}>
                {props.title.toUpperCase()}
            </div>
            <div className={style.black_line} />
        </div>
    )
}