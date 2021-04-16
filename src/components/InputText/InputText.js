import React, { useState, useEffect } from 'react';
import { container, input } from './InputText.module.scss';
import classNames from 'classnames';

let timeout;

export default function InputText(props) {
    // const [value, setValue] = useState(props.value || '')

    // useEffect(() => {
    //     clearTimeout(timeout);

    //     timeout = setTimeout(() => {
    //         props.setValue(value)
    //     }, 150);
    // }, [value])

    const handleChange = e => {
        if (e.target.name === props.name) {
            props.setValue(e.target.value);
        }
    }

    return (
        <div
            className={classNames(
                container,
                {[props.className]: props.className}
            )}
            style={props.style} >
            <input
                type={'text'}
                placeholder={props.placeholder}
                name={props.name}
                className={input}
                onChange={handleChange}
                onKeyPress={typeof props.onKeyPress === 'function' ? props.onKeyPress : () => {}}
                value={props.value || ''}
            />
        </div>
    )
}