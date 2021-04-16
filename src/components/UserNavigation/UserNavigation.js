import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { container, title, selected } from './UserNavigation.module.scss';

/**
 * 
 * Accepted Properties:
 * @param {Array} title array of string that contain the page titles
 * @param {Array} path array of string that contain the page path 
 */
export default function PageTitle(props) {
    if (!Array.isArray(props.title) || !Array.isArray(props.path || !(props.title.length === props.path.length))) {
        console.error('Error Page Title Component: title and path properties has to be an Array with same length');
    }

    return (
        <div className={container + ' ' + props.className} style={props.style}>
            {
                props.title.map((el, i) => {
                    return <NavLink exact key={i} to={props.path[i]} className={title} activeClassName={selected}>{el.toUpperCase()}</NavLink>
                })
            }
        </div>
    )
}