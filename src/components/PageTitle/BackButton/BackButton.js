import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ReactComponent as ChevronLeft } from '../../../assets/chevron_left_blue.svg'
import { back } from './BackButton.module.scss'

export default function BackButton(props) {
    return (
        <Link to={props.to}>
            <ChevronLeft className={back} />
        </Link>
    )
}
