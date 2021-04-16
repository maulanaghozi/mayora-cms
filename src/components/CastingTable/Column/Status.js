import React from 'react'
import Select from 'react-select'
import { http } from '../../../utility/http'
import { table_cell, column_status } from '../CastingTable.module.scss'
import { capitalize } from '../../../utility/utility'

export default function Status(props) {

    const handleChange = inputValue => {
        http({
            method: 'POST',
            path: 'posting/casting/update/' + props.row.casting_id,
            data: {
                status: inputValue.value
            }
        })
        .then(result => {
            props.setKey()
        })
    }

    const customStyle = {
        container: (provided, state) => ({
            ...provided,
            marginLeft: '0px',
            height: '25px',
            minHeight: '25px',
            width: '85px',

            '&::focus': {
                border: 'none'
            }
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            backgroundColor: '#ffffff'
        }),
        control: (provided, state) => ({
            ...provided,
            borderRadius: 0,
            backgroundColor: 'none',
            border: 'none',
            height: '25px',
            minHeight: '25px',
            width: '85px',
            fontFamily: '"roboto"',
            fontSize: '0.8rem',
            color: '#000000',
            padding: 0,
            cursor: 'pointer',

            border: state.isFocused ? 0 : 0,
            boxShadow: state.isFocused ? 0 : 0,
            '&:hover': {
                border: state.isFocused ? 0 : 0
            }
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            padding: '0px',
            width: '20px',
            height: '25px',
            display: 'block',
            marginTop: '3px'
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
            fontFamily: '"roboto"',
            fontSize: '0.8rem',
            color: '#000000',
        }),
        menu: (provided, state) => ({
            ...provided,
            borderRadius: 0,
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            padding: 0,
            paddingLeft: '3px',
            position: 'initial'
        })
    }

    return (
        <div className={table_cell + ' ' + column_status}>
            <Select
                key={props.row.status}
                defaultValue={{ value: props.row.status, label: capitalize(props.row.status) }}
                options={[{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published / Closed' }]}
                onChange={handleChange}
                styles={customStyle}
                isSearchable={false}
            />
        </div>
    )
}