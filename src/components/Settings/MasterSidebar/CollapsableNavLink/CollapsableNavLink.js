import React, { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

import { ReactComponent as Chevron } from '../../../../assets/chevron_right_grey.svg';

import {
    nav_container, collapsable_header, collapsable_container,
    wrapper
} from './CollapsableNavLink.module.scss';

export default function CollapsableNavLink(props) {
    const [collapse, setCollapse] = useState(false);

    const handleCollapse = () => {
        setCollapse(!collapse);
    }
    
    return (
        <div className={nav_container}>
            <div className={collapsable_header} onClick={handleCollapse}>
                <props.Icon width={'1.5rem'} height={'1.5rem'} />
                <span>{props.name}</span>
                <Chevron
                    style={{
                        transform: collapse ? 'rotate(-90deg)' : 'rotate(90deg)',
                        height: '0.8rem',
                        width: '1.5rem'
                    }} />
            </div>
            <div className={collapsable_container}>
                
                {collapse && Array.isArray(props.options) && props.options.map((nav, index) => {
                    return <NavLink
                        key={index}
                        to={{
                            pathname: nav.path,
                        }}
                    >
                        {nav.name}
                    </NavLink>
            })}
            </div>
        </div>
    )
}
