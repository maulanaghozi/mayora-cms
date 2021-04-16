import React from 'react'
import Select from 'react-select'
import { http } from '../../../utility/http'

import { table_cell, column_status } from '../TalentTable.module.scss'

export default function Status(props) {

    const handleChange = inputValue => {
        http({
            method: 'POST',
            path: 'profiles/talent/picked/' + props.row.user_id,
            data: {
                featured: inputValue.value
            }
        })
            .then(result => {
                if (result && result.code === 'success') {
                    // console.log('succeess')
                } else {
                    // console.log('Fatch Failed')
                }
            })
    }

    const customStyle = {
        container: (provided, state) => ({
            ...provided,
            marginLeft: '10px',
            height: '25px',
            minHeight: '25px',
            width: '100%',

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
            width: '85%',
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
        <div className={table_cell, column_status}>
            <Select
                defaultValue={{ 
                    value: props.row.ph_confirm,
                    label: (props.row.ph_confirm == 1) ? 'Verified' : 'Unconfirm'
                }}
                options={[
                    { value: '0', label: 'Unconfirm' },
                    { value: '1', label: 'Verified' }
                ]}
                styles={customStyle}
                isSearchable={false}
                onChange={handleChange}
            />
        </div>
    )
}