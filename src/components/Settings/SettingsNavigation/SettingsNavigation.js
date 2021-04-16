import React from 'react';
import { NavLink } from 'react-router-dom';
import { nav_container, title, link, link_container, selected, title_container } from './SettingsNavigation.module.scss'

export default function SettingsNavigation() {
    return (
        <div className={nav_container}>
            <div className={title_container}>
                <span className={title}>SETTINGS</span>
            </div>
            <div className={link_container}>
                <NavLink
                    activeClassName={selected}
                    className={link}
                    to={'/settings/terms-n-conditions'}
                >
                    {'Terms & Conditions'}
                </NavLink>
                <NavLink
                    activeClassName={selected}
                    className={link}
                    to={'/settings/privacy-policy'}
                >
                    {'Privacy Policy'}
                </NavLink>
                <NavLink
                    activeClassName={selected}
                    className={link}
                    to={'/settings/landing-page'}
                >
                    {'Landing Page'}
                </NavLink>
                <NavLink
                    activeClassName={selected}
                    className={link}
                    to={'/settings/master-data-details'}
                >
                    {'Master Data Details'}
                </NavLink>
            </div>
        </div>
    )
}