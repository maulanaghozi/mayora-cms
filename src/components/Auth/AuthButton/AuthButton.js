import React from 'react';

import { container } from './AuthButton.module.scss';

export default function AuthButton(props) {
    return (
        <button className={container} onClick={props.onClick}>
            {props.text}
        </button>
    )
}