import React from 'react';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types'

/**
 * InputSelect Component
 */
export default function InputTag(props) {
    const customStyle = {
        container: (provided, state) => ({
            ...provided,
            ...props.style,
            userSelect: 'none'
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            backgroundColor: '#ffffff'
        }),
        control: (provided, state) => ({
            ...provided,
            borderRadius: 0,
            border: '2px solid #e9eff4',
            // height: '3rem',
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '0.8rem',
            fontWeight: '500',
            color: '#000000',
            paddingLeft: '5px'
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            width: '2rem',
            justifyContent: 'center'
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            padding: '0px',
            paddingRight: '2px',
            color: '#000000',
            '&:hover': {
                color: '#000000'
            }
        }),
        menuList: (provided, state) => ({
            ...provided,
            color: 'black',
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '0.8rem',
            fontWeight: '500',
            color: '#000000',
        }),
        menu: (provided, state) => ({
            ...provided,
            borderRadius: 0
        }),
        placeholder: (provided, state) => ({
            ...provided,
            fontStyle: 'italic',
            color: '#acacac'
        })
    }

    return (
        <CreatableSelect
            className={props.className}
            options={null}
            isSearchable={false}
            styles={customStyle}
            onChange={props.onChange}
            isMulti
            defaultValue={props.defaultValue}
            isSearchable={true}
            noOptionsMessage={() => props.menuMessage}
            isClearable={false}
            placeholder={props.placeholder}
            components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
            }}
        />
    )
}