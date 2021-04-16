import React from 'react';
import { table_cell, column_featured } from '../GroupTable.module.scss';
import Select from 'react-select';
import { http } from '../../../utility/http';

export default function Featured(props) {
    const handleChange = inputValue => {
        http({
            method: 'POST',
            path: 'posting/groups/featured/' + props.row.id,
            data: {
                featured: inputValue.value
            }
        })
    }
    const customStyle = {
        container: (provided, state) => ({
            ...provided,
            marginLeft: '10px',
            height: '25px',
            minHeight: '25px',
            width: '50px',

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
            width: '50px',
            fontFamily: '"roboto"',
            fontSize: '0.8rem',
            color: '#000000',
            padding: 0,

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
            display: 'block'
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
        <div className={table_cell + ' ' + column_featured}>
            <Select
                defaultValue={{value: props.row.featured, label: (props.row.featured == 1) ? 'Yes' : 'No'}}
                options={[{value: '0', label: 'No'}, {value: '1', label: 'Yes'}]}
                styles={customStyle}
                isSearchable={false}
                onChange={handleChange}
            />
        </div>
    )
}
