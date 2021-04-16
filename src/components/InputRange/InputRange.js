import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import Slider, { Range } from 'rc-slider';
import style from './InputRange.module.scss';
import diamondHandle from '../../assets/diamond-handle.png';
import {throttle} from 'throttle-debounce';
import 'rc-slider/assets/index.css';

const rangeHandleStyle = {
    width: '23px',
    height:'23px',
    border: 0,
    borderRadius: 0,
    backgroundImage: `url(${diamondHandle})`,
    backgroundColor: 'transparent',
    backgroundSize: 'contain',
    bottom: '-20%'
}

export default function InputRange(props) {
    const [min, setMin] = useState(props.value[0])
    const [max, setMax] = useState(props.value[1])

    useEffect(() => {
        if (
            max > min &&
            min >= props.min &&
            max <= props.max
        ) {
            props.onChange([min, max]);
        }
    }, [min, max])
    

    const handleTextFocus = e => e.target.select();

    return (
        <div style={props.style} className={props.className}>
            {
                !props.typable &&
                <div>
                    <span
                        className={style.range_text}
                    >
                        {props.description + ': '}
                    </span>
                    <span
                        className={classNames(
                            style.range_text, style.black
                        )}
                    >
                        {props.value[0] + ' - ' + props.value[1]}
                    </span>
                </div>
            }
            <Range
                className={style.range}
                min={props.min}
                max={props.max}
                step={props.step}
                defaultValue={[min, max]}
                value={props.value}
                trackStyle={[{backgroundColor: '#00aeef', height: '1.5px'}]}
                railStyle={{height: '1.5px'}}
                handleStyle={[rangeHandleStyle, rangeHandleStyle]}
                allowCross={false}
                onChange={
                    throttle(500, value => {
                        setMin(value[0]);
                        setMax(value[1]);
                    })
                }
            />
            {
                props.typable &&
                <div className={style.text_input_container}>
                    <input
                        name={'min'}
                        className={classNames(style.text_input, style.left_margin)}
                        value={min}
                        onChange={e => {
                            if (e.target.name === 'min') {
                                const numValue = parseInt(e.target.value);
                                
                                if (numValue) {
                                    setMin(numValue);
                                } else if (e.target.value.length === 0) {
                                    setMin(0);
                                }
                                
                            }
                        }}
                        onFocus={handleTextFocus}
                        onBlur={e => {
                            if (min < props.min) {
                                setMin(props.min);
                            }

                            if (max <= min) {
                                setMin(props.value[1] - 1);
                            }
                        }}
                    />
                    <input
                        name={'max'}
                        className={classNames(style.text_input, style.right_margin)}
                        value={max}
                        onChange={e => {
                            if (e.target.name === 'max') {
                                const numValue = parseInt(e.target.value);

                                if (numValue) {
                                    setMax(numValue);
                                } else if (e.target.value.length === 0) {
                                    setMax(0);
                                }
                                
                            }
                        }}
                        onFocus={handleTextFocus}
                        onBlur={e => {
                            if (max > props.max) {
                                setMax(props.max);
                            }

                            if (max <= min) {
                                setMax(props.value[0] + 1);
                            }
                        }}
                    />
                </div>
            }
        </div>
    )
}
