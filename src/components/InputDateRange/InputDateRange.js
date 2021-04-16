import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import ReactDatePicker from 'react-datepicker';
import { ReactComponent as CalenderIcon } from '../../assets/calendar_icon.svg';
import {RedCross} from '../../assets/image';
import style from './InputDateRange.module.scss';

import '../../../node_modules/react-datepicker/dist/react-datepicker.css';

export default function InputDateRange(props) {
    const [currentState, setCurrentState] = useState('idle');
    const [startDate, setStartDate] = useState(props.startDate);
    const [endDate, setEndDate] = useState(props.endDate);

    const renderDate = () => {
        let date;

        switch (currentState) {
            case 'start':
                date = 'Select date - Select date';
                break;
            case 'end':
                date = moment(startDate).format('DD MMM YYYY') +
                ' - Select date'
                break;
            case 'idle':
            default:
                if (props.startDate && props.endDate) {
                    date = moment(props.startDate).format('DD MMM YYYY') +
                    ' - ' +
                    moment(props.endDate).format('DD MMM YYYY')
                } else {
                    date = 'Select date - Select date';
                }
                break;
        }

        return date;
    }

    const clearData = e => {
        if (props.startDate && props.endDate && !props.unclearable) {
            e.stopPropagation();
            
            props.setStartDate(null);
            props.setEndDate(null);
        }
    }

    useEffect(() => {
        // console.log(currentState)
    }, [currentState])

    return (
        <ReactDatePicker
            selected={currentState === 'end' ? endDate : startDate}
            onChange={date => {
                if (currentState === 'end') {
                    setEndDate(date);
                    setCurrentState('idle');
                } else {
                    setStartDate(date)}
                    setCurrentState('end');
                }
            }
            selectsEnd={currentState === 'end'}
            startDate={currentState === 'end' ? startDate : false}
            endDate={currentState === 'end' ? endDate : false}
            minDate={currentState === 'end' ? startDate : false}
            maxDate={props.maxDate}
            shouldCloseOnSelect={currentState === 'end'}
            onClickOutside={() => {
                if (
                    (currentState === 'end') &&
                    startDate &&
                    endDate
                ) {
                    props.setStartDate(startDate);
                    props.setEndDate(endDate);  
                }
            }}
            onCalendarClose={() => {
                if (
                    (currentState === 'end') &&
                    startDate &&
                    endDate
                ) {
                    props.setStartDate(startDate);
                    props.setEndDate(endDate);
                }
                setCurrentState('idle');
            }}
            onCalendarOpen={() => {
                if (currentState === 'idle') {
                    setCurrentState('start');
                    setStartDate(null);
                    setEndDate(null);
                }
            }}
            onFocus={() => {
                if (currentState === 'idle') {
                    setCurrentState('start');
                    setStartDate(null);
                    setEndDate(null);
                }
            }}
            onBlur={() => {
                if (
                    (currentState === 'end') &&
                    startDate &&
                    endDate
                ) {
                    props.setStartDate(startDate);
                    props.setEndDate(endDate);
                }
                setCurrentState('idle');
            }}
            disabledKeyboardNavigation
            showMonthYearPicker={props.range === 'month'}
            customInput={
                <div className={classNames(style.date_picker_container, props.className)}>
                    <div className={style.date_picker}>
                        <span className={style.prefix}>{props.prefix}</span>
                        {
                            renderDate()
                        }
                    </div>
                    <div className={style.calendar_icon} onClick={clearData}>
                        {
                            (props.startDate && props.endDate && !props.unclearable) ?
                            <RedCross height={12} width={12} /> :
                            <CalenderIcon />
                        }
                    </div>
                </div>
            }
        />
    )
}