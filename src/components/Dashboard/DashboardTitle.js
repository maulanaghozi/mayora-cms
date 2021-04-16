import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import { ReactComponent as CekidotIcon } from '../../assets/cekidot.svg';

import { title } from './DashboardTitle.module.scss'

/**
 * 
 * @param {String} title Title of dashboard content 
 * @param {String} to Path to redirect when clicking cekidot icon 
 */
export default function DashboardTitle(props) {
    return (
        <React.Fragment>
            <span className={title}>{props.title}</span>
            <Link to={props.to}>
                <span><CekidotIcon /></span>
            </Link>
        </React.Fragment>
    )
}

DashboardTitle.propTypes = {
    title: PropTypes.string,
    to: PropTypes.string
}