import React from 'react'
import Select from 'react-select'
import { useAlert } from 'react-alert'
import { http } from '../../../utility/http'
import { table_cell, column_status } from '../StoryTable.module.scss'

const customStyle = {
    container: (provided, state) => ({
        ...provided,
        marginLeft: '0',
        height: '25px',
        minHeight: '25px',
        width: '70px',

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
        width: '70px',
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
        paddingLeft: '0',
        position: 'initial'
    })
}

export default function Status(props) {
    const alert = useAlert()
    const handleChange = inputValue => {
        http({
            method: 'POST',
            path: 'promotion/story/' + props.row.id,
            data: {
                status: inputValue.value
            }
        })
            .then(result => {
                if (result && result.code === 'success') {
                    alert.success('succeess');
                    props.setKey()
                } else {
                    alert.error('Update Status Failed')
                }
            })

    }
    return (
        <div className={table_cell + ' ' + column_status}>
            <Select
                defaultValue={{ value: props.row.status, label: (props.row.status === 'active') ? 'Active' : 'Inactive' }}
                options={[{ value: 'inactive', label: 'Inactive' }, { value: 'active', label: 'Active' }]}
                styles={customStyle}
                isSearchable={false}
                onChange={handleChange}
            />
        </div>
    )
}