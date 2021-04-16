import React from 'react';
import Select from 'react-select';
import { http } from '../../../utility/http';
import { table_cell, column_staff_pick } from '../TalentTable.module.scss';
import {useAlert} from 'react-alert';

export default function StaffPick(props) {
    const alert = useAlert();
    const handleChange = inputValue => {
        const staffPickOrder = parseInt(props.row.staff_pick_order);
        const isPicked = staffPickOrder > 0;
        
        http({
            method: 'GET',
            path: 'profiles/talent/staff-picked'
        })
        .then(getResult => {
            if (getResult && getResult.code === 'success') {
                const orderHash = {}
                const staffPicked = getResult.payload.map((user, index) => {
                    orderHash[user.user_id] = index;
                    return user.user_id;
                });

                if (!isPicked) {
                    staffPicked.push(props.row.user_id);
                } else {
                    staffPicked.splice(orderHash[props.row.user_id], 1);
                }

                http({
                    method: 'POST',
                    path: 'profiles/talent/staff-picked/update',
                    data: {user_ids: staffPicked}
                })
                .then(updateResult => {
                    props.setSessionId();

                    if (updateResult && updateResult.code === 'success'){
                        // success
                    } else {
                        alert.error('failed to update staff pick')
                    }
                })
            } else {
                console.error('failed to fetch staff pick');
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
        <div className={table_cell + ' ' + column_staff_pick}>
            <Select
                defaultValue={{
                    value: props.row.staff_pick_order > 0,
                    label: (props.row.staff_pick_order > 0) ? 'Yes' : 'No'
                }}
                options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]}
                styles={customStyle}
                isSearchable={false}
                onChange={handleChange}
            />
        </div>
    )
}