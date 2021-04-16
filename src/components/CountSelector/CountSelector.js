import React from 'react';
import Select from 'react-select';
import classNames from 'classnames';

import { container, select_up } from './CountSelector.module.scss'

export default function CountSelector(props) {
    const handleChange = inputValue => {
        props.setRow(inputValue.value);
    }
    const customStyle = {
        container: (provided, state) => ({
            ...provided,
            marginLeft: '10px',
            height: '25px',
            minHeight: '25px',
            width: '50px',
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            backgroundColor: '#ffffff'
        }),
        control: (provided, state) => ({
            ...provided,
            borderRadius: 0,
            border: '2px solid #e9eff4',
            height: '25px',
            minHeight: '25px',
            width: '50px',
            fontFamily: '"roboto"',
            fontSize: '0.8rem',
            color: '#000000',
            padding: 0
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            padding: '0px',
            width: '20px',
            height: '25px',
            display: 'block'
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            padding: '0px',
            paddingRight: '2px',
            color: '#000000',
            transform: 'rotate(180deg)',

            '&:hover': {
                color: '#000000'
            }
        }),
        menuList: (provided, state) => ({
            ...provided,
            color: 'black',
            fontFamily: '"roboto"',
            fontSize: '0.8rem',
            color: '#000000',
        }),
        menu: (provided, state) => ({
            ...provided,
            borderRadius: 0,
            position: 'absolute !important',
            top: 'auto !important',
            bottom: 'calc(100% - 1px) !important',
            borderBottomLeftRadius: '0px !important',
            borderBottomRightRadius: '0px !important',
            borderTopLeftRadius: '5px !important',
            borderTopRightRadius: '5px !important',
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            padding: 0,
            paddingLeft: '3px',
            position: 'initial'
        })
    }

    return (
        <div className={classNames(container, props.className)}>
            <span>Records per page:</span>
            <div className={select_up}>
                <Select
                    options={[
                        { value: 10, label: 10 },
                        { value: 25, label: 25 },
                        { value: 50, label: 50 },
                        { value: 100, label: 100 }
                    ]}
                    defaultValue={{ value: 10, label: 10 }}
                    placeholder={'page'}
                    styles={customStyle}
                    isSearchable={false}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}