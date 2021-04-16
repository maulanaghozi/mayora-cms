import React, {useState, useEffect} from 'react';
import {capitalize} from '../../utility/utility';
import style from './InputToggle.module.scss';
import classNames from 'classnames';

export default function InputToggle(props) {
    const [selected, setSelected] = useState(props.defaultValue);

    const onChange = selected => {
        props.onChange(selected);
    }
    useEffect(() => {
        onChange(selected);
    }, [selected]);

    const handleChange = e => {
        if(e.target.type === 'radio') {
            setSelected(e.target.value);
        }
    }

    return (
        <div className={classNames(style.input_radio, props.className)}>
            <div className={style.label_container}>
                <div className={style.label_wrapper}>
                    <label className={style.label}>
                        <input
                            type={'radio'}
                            checked={selected === props.options[0].value}
                            name={'radio'}
                            value={props.options[0].value}
                            onChange={handleChange}
                        />
                        <span className={style.type_box}>
                            {capitalize(props.options[0].label)}
                        </span>
                    </label>
                </div>
                <div className={style.label_wrapper}>
                    <label className={style.label}>
                        <input
                            type={'radio'}
                            checked={selected === props.options[1].value}
                            name={'radio'}
                            value={props.options[1].value}
                            onChange={handleChange}
                        />
                        <span className={style.type_box}>
                            {capitalize(props.options[1].label)}
                        </span>
                    </label>
                </div>
            </div>
        </div>
    )
}
