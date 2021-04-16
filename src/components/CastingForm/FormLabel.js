import React from 'react';
import style from './CastingForm.module.scss';
import classNames from 'classnames'

export default function FormLabel(props) {
    return (
        <div className={classNames(style.input_container, props.className)}>
            <div className={style.label}>
                <div className={style.text_container}>
                    {props.label}
                </div>
            </div>
            {props.children}
        </div>
    )
}
