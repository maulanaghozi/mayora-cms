import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { ReactComponent as PlusIcon } from '../../assets/plus.svg'

import { container, icon } from './AddButton.module.scss'

export default function AddButton(props) {
    return (
        <Link className={container} to={props.to}>
            <PlusIcon width={14} className={icon} />
            {props.text}
        </Link>
    )
}
