import React from 'react';
import { ReactComponent as PlusIcon } from '../../../assets/plus.svg';
import {
    container, settings_button__blue, settings_button__white,
    button_container, add_button
} from './SettingsFooter.module.scss';

export default function SettingsFooter(props) {
    const handleAdd = () => {
        props.setLandingPages([
            ...props.landingPages,
            {
                id: 'create' + Math.round(Math.random() * 10000),
                image_url: 'https://via.placeholder.com/131x210?text=KESTINGRUM',
                catch_phrase: ''
            }
        ])
    }

    return (
        <div className={container}>
            <div className={add_button} onClick={handleAdd}>
                <PlusIcon />
                <span>New Page</span>
            </div>
            <div className={button_container}>
                <div className={settings_button__white} onClick={() => {props.setInPreview(true)}}>PREVIEW</div>
                <div className={settings_button__blue} onClick={props.save}>{props.isLoading ? 'UPLOADING...' : 'SAVE'}</div>
            </div>
        </div>
    )
}
