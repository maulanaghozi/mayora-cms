import React, { useState, useEffect } from 'react';
import style from './InputMiniToggle.module.scss';
import classNames from 'classnames';

export default function InputMiniToggle(props) {
    const [isActive, setIsActive] = useState(props.value || 0);
    // const {onChange} = props;

    const onChange = isActive => {
        props.onChange(isActive);
    }
    useEffect(() => {
        onChange(isActive);
    }, [isActive])

    return (
        <label className={style.mini_toggle_container}>
            <div className={classNames(
                style.mini_toggle_slider,
                {[style.active]: isActive === 1}
            )} />
            <div className={classNames(
                style.mini_toggle_handle,
                {[style.active]: isActive === 1}
            )} />
            <input
                type={'checkbox'}
                onChange={e => {
                    if (e.target.checked) {
                        setIsActive(1);
                    } else {
                        setIsActive(0);
                    }
                }}
            />
        </label>
    )
}
