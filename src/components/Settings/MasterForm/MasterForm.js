import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAlert } from "react-alert";

import useHeader from '../../../hooks/useHeader/useHeader';
import { http } from '../../../utility/http';
import { replaceAndModify, capitalize } from '../../../utility/utility';

import { ReactComponent as PlusIcon } from '../../../assets/plus.svg';

import style from './MasterForm.module.scss';
import ColorPicker from '../../ColorPicker/ColorPicker';

const colors = [
    '#ab7d5e',
    '#f2dac5',
    '#dbba9f',
    '#89583a',
    '#512911'
]

export default function MasterForm(props) {
    const [newMasterData, setNewMasterData] = useState([{[props.attribute]: '', hex_color: colors[2]}]);
    const [isSaving, setIsSaving] = useState(false);
    const [colorPickerIsOpen, setColorPickerIsOpen] = useState(false);
    
    const location = useLocation();
    const pathArr = location.pathname.split('/');

    const alert = useAlert();

    useHeader({
        title: [
            'Settings',
            'Master Data',
            replaceAndModify(pathArr[pathArr.length - 1], '-', ' ', word => capitalize(word))
        ],
        path: ['/settings', 'settings/master-data-details', location.pathname]
    })

    const handleChange = e => {
        const currentArray = newMasterData.slice();
        const currentValue = {...newMasterData[e.target.name], [props.attribute]: e.target.value}
        currentArray[e.target.name] = currentValue;

        setNewMasterData(currentArray);
    }

    const handleColorChange = (selectedColor, index) => {
        const currentArray = newMasterData.slice();
        currentArray[index] = {...newMasterData[index], hex_color: selectedColor}

        setNewMasterData(currentArray);
    }

    const handleRemove = (index) => {
        const currentValue = newMasterData.slice();

        if(currentValue.length > 1) {
            currentValue.splice(index, 1);
        }

        setNewMasterData(currentValue);
    }

    const handleAdd = () => {
        setNewMasterData([...newMasterData, {[props.attribute]: '', hex_color: colors[2]}]);
    }

    const handleSubmit = () => {
        setIsSaving(true);

        http(
            {
                method: 'PUT',
                path: props.apiUrl + '/create',
                data: {master_data: newMasterData}
            }
        )
        .then(result => {
            setIsSaving(false);

            if(result && result.code === 'success') {
                alert.success(props.type + ' update success');
                props.fetchMasterData();
            } else {
                alert.error(props.type + ' update failed')
            }
        })
    }

    return (
        <div className={style.form_container}>
            <div className={style.label}>{'New ' + props.type + ':'}</div>
            <div className={style.input_container}>
                <button
                    className={style.add_field}
                    onClick={handleAdd}
                >
                    <PlusIcon/>
                    <span>Add Field</span>
                </button>
                {newMasterData.map((el, index) => (
                    <div className={style.input_row} key={index}>
                        <input
                            name={index}
                            index={index}
                            type={'text'}
                            value={newMasterData[index][props.attribute]}
                            onChange={handleChange}
                            placeholder={props.type + ' name'}
                        />
                        {
                            props.attribute === 'skin_color' &&
                            <div className={style.color_picker_container}>
                                <ColorPicker
                                    index={index}
                                    initialColor={colors[2]}
                                    open={colorPickerIsOpen}
                                    setOpen={setColorPickerIsOpen}
                                    colors={colors}
                                    onColorChange={handleColorChange}
                                />
                            </div>
                        }
                        <button
                            className={style.remove_button}
                            onClick={() => handleRemove(index)}
                        >
                            <div />
                        </button>
                    </div>

                ))}
                <button
                    className={style.submit_button}
                    onClick={handleSubmit}
                >
                    {isSaving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    )
}
