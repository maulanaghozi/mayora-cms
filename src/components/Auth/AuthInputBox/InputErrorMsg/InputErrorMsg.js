import React from 'react';

import { ReactComponent as WarningIcon } from '../../../../assets/warning.svg';

import { container, triangle, icon, box } from './InputErrorMsg.module.scss';

export default function InputErrorMsg(props) {
    return (
        <div className={container}>
            <div className={triangle} />
            <div className={box}>
                <WarningIcon className={icon} fill={'#ffffff'} width={10} />
                <div>{props.errorMsg}</div>
            </div>
        </div>
    )
}
