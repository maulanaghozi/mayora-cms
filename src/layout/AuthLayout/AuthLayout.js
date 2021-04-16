import React from 'react';
import {container, box, logo} from './AuthLayout.module.scss';
import {ReactComponent as Logo }from "../../assets/logo.svg";

export default function AuthLayout(props) {
    return (
        <div className={container}>
            <div className={box}>
                <Logo className={logo} />
                {props.children}
            </div>
        </div>
    )
}
