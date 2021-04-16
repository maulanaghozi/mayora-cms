import React, {useEffect} from 'react';
import classNames from 'classnames'
import { settings_container, wrapper, scroll_wrapper } from './SettingsContainer.module.scss';
import Content from '../../Content/Content';
import SettingsNavigation from '../SettingsNavigation/SettingsNavigation';

export default function SettingsContainer(props) {
    return (
            <div className={settings_container}>
                <SettingsNavigation />
                <div className={scroll_wrapper} style={props.style}>
                    <div
                        className={classNames(wrapper, props.wrapperClassName ? props.wrapperClassName : '')}
                        style={props.wrapperStyle ? props.wrapperStyle : null}
                    >
                        {props.children}
                    </div>
                </div>   
            </div>
    )
}