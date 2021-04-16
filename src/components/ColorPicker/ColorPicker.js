import React, {useState, useRef} from 'react';
import { BlockPicker } from 'react-color';
import {useClickOutside} from '../../hooks/useClickOutside/useClickOutside';

import {
    color_picker_container,
    color_picker
} from './ColorPicker.module.scss';

export default function ColorPicker(props) {
    const [color, setColor] = useState(props.initialColor);
    const [isOpen, setIsOpen] = useState(false);
    const colorRef = useRef(null);

    useClickOutside(colorRef, () => {
        setIsOpen(false);
        props.setOpen(false);
    })

    const handleClick = e => {
        if (!props.open && !isOpen) {
            setIsOpen(true);
            props.setOpen(true);
        } else if (props.open && isOpen) {
            setIsOpen(false);
            props.setOpen(false);
        }
    }

    const handleChange = (selectedColor, event) => {
        setColor(selectedColor.hex);
    }

    const handleChangeComplete = (selectedColor, event) => {
        setIsOpen(false);
        props.onColorChange(selectedColor.hex, props.index)
    }
    return (
        <div
            className={color_picker_container}
            style={{backgroundColor: color}}
            onClick={handleClick}
        >
            {
                isOpen &&
                <div className={color_picker} ref={colorRef}>
                    <BlockPicker
                        color={color}
                        colors={props.colors}
                        onChange={handleChange}
                        onChangeComplete={handleChangeComplete}
                    />
                </div>
            }
        </div>
    )
}
