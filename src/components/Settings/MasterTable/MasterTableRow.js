import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useAlert } from "react-alert";

import WarningModal from '../../WarningModal/WarningModal';
import ColorPicker from '../../ColorPicker/ColorPicker';

import { ReactComponent as EditIcon } from '../../../assets/edit.svg';
import { ReactComponent as SaveIcon } from '../../../assets/save.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/rubbish.svg';
import { ReactComponent as CancelIcon } from '../../../assets/cancel.svg';

import style from './MasterTable.module.scss';
import { http } from '../../../utility/http';

const colors = [
    '#ab7d5e',
    '#f2dac5',
    '#dbba9f',
    '#89583a',
    '#512911'
]

export default function MasterTableRow(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [inputValue, setInputValue] = useState(props.data.type);
    const [colorInput, setColorInput] = useState(props.data.color);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [colorPickerIsOpen, setColorPickerIsOpen] = useState(false);

    const inputRef = useRef(null);
    const alert = useAlert();

    useEffect(() => {
        inputRef.current.focus()
    }, [isEditing])

    const handleUpdate = () => {
        setIsUpdating(true);

        const data = {
            [props.attribute]: inputValue
        }

        if (props.attribute === 'skin_color') {
            data.hex_color = colorInput;
        }

        http({
            method: 'POST',
            path: props.apiUrl + '/' + props.data.id,
            data
        })
        .then(result => {
            setIsUpdating(false);
            setIsEditing(false);
            props.setTableIsEditing(false);

            if(result && result.code === 'success') {
                // alert.success('update success!');
            } else {
                alert.error('update failed!');
                handleCancel();
            }
        })
    }

    const handleEdit = () => {
        if(props.tableIsEditing) {
            alert.error('save or cancel current change, before editing new row!')
        } else {
            setIsEditing(true);
            props.setTableIsEditing(true);
        }
    }

    const handleCancel = () => {
        setIsEditing(false);
        props.setTableIsEditing(false);
    }

    const handleChange = e => {
        setInputValue(e.target.value);
    }

    const handleDelete = () => {
        setIsDeleting(true);

        http({
            method: 'DELETE',
            path: props.apiUrl + '/' + props.data.id
        })
        .then(result => {
            setIsDeleting(false);
            closeModal();

            if(result && result.code === 'success') {
                alert.success(result.payload[props.attribute] + ' has been removed!');
                props.fetchMasterData();
            } else {
                alert.error('failed to remove item');
            }
        })
    }

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const handleColorChange = (selectedColor, index) => {
        setColorInput(selectedColor);
    }

    return (
        <div className={classNames(style.table_row, {[style.editing]: isEditing})}>
            <div className={style.table_cell}>{props.index + 1}</div>
            <div className={classNames(style.table_cell, style.grow)}>
                <input
                    name={props.index}
                    type={'text'}
                    value={inputValue}
                    className={style.input_text}
                    onChange={handleChange}
                    disabled={!isEditing}
                    ref={inputRef}
                />
                {
                    (
                        props.data.color &&
                        !isUpdating
                    ) ?
                    <div className={style.hex_color} style={{backgroundColor: props.data.color}}></div> :
                    (
                        (
                            props.data.color &&
                            isUpdating
                        ) ?
                        <div className={style.color_picker_container}>
                            <ColorPicker
                                initialColor={colors[2]}
                                open={colorPickerIsOpen}
                                setOpen={setColorPickerIsOpen}
                                colors={colors}
                                onColorChange={handleColorChange}
                            />
                        </div> :
                        null
                    )
                }
            </div>
            <div className={style.table_cell}>
                {
                    isEditing ?
                    <React.Fragment>
                        {
                            isUpdating ?
                            'Updating...' :
                            <SaveIcon title={'save'} className={style.icon} onClick={handleUpdate} />
                        }
                        <CancelIcon title={'cancel'} className={style.icon} onClick={handleCancel} />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <EditIcon title={'edit'} className={style.icon} onClick={handleEdit} />
                        <DeleteIcon title={'remove'} className={style.icon} onClick={openModal} />
                    </React.Fragment>
                }
            </div>
            {
                modalIsOpen ?
                <WarningModal
                    title={'Remove ' + props.type}
                    content={
                        'Are you sure want to remove ' +
                        inputValue + ' from ' + props.type + '?'
                    }
                    leftOption={isDeleting ? 'Removing...' : 'Yes'}
                    rightOption={'No'}
                    leftAction={handleDelete}
                    rightAction={closeModal}
                    close={closeModal}
                />
                :
                null
            }               
        </div>
    )
}
