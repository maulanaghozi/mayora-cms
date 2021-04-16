import React from 'react';
import classNames from 'classnames';
import style from './BoxButton.module.scss';

export default function BoxButton(props) {
    const onClick = e => {
        if (!props.disabled) {
            props.onClick(e);
        }
    }
    return (
        <div
            className={classNames(
                props.className,
                style.button,
                {[style.disabled]: props.disabled}
            )}
            style={props.style}
            onClick={onClick}
        >
            {props.text ? props.text.toUpperCase() : ''}
        </div>
    )
}
