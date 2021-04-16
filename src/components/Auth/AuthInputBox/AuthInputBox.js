import React, {useState} from "react";
import { container, input, icon, message, triangle } from './AuthInputBox.module.scss';
import {ReactComponent as EyeIcon} from '../../../assets/eye.svg';
import {ReactComponent as EyeOffIcon} from '../../../assets/eye_off.svg';
import InputErrorMsg from './InputErrorMsg/InputErrorMsg';

export default function InputBox(props) {
    const [focus, setFocus] = useState(false);
    const [placeholder, setPlaceholder] = useState(props.inputAttr.placeholder);
    const [passwordType, setPasswordType] = useState('password');

    const handleFocus = () => {
        setFocus(true);
        props.setErrorMsg(false);
        setPlaceholder('');
    }

    const handleBlur = () => {
        setFocus(false);
        setPlaceholder(props.inputAttr.placeholder);
    }

    const toggleHide = () => {
        if(passwordType === 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password')
        }
    }

    return (
        <div className={container}>
            {(focus || props.inputAttr.value) && <props.FocusIcon className={icon} />}
            {!(focus || props.inputAttr.value) && <props.Icon className={icon} />}
            <input
                className={input}
                onFocus={handleFocus}
                onBlur={handleBlur}
                name={props.inputAttr.name}
                type={props.inputAttr.type === 'password' ? passwordType : props.inputAttr.type}
                value={props.inputAttr.value}
                onChange={props.inputAttr.onChange}
                placeholder={placeholder}
            />
            {
                props.inputAttr.type === 'password' ?
                (
                    passwordType === 'password' ?
                    <EyeIcon onClick={toggleHide} style={{marginRight: 16, cursor: 'pointer'}} width={25} /> :
                    <EyeOffIcon onClick={toggleHide} style={{marginRight: 16, cursor: 'pointer'}} width={25} />
                ) :
                null
            }
            {props.errorMsg && <InputErrorMsg errorMsg={props.errorMsg} />}
        </div>
  );
}
