import React from 'react';
import useHeader from '../../../hooks/useHeader/useHeader'
import SettingsWysiwyg from '../../../components/Settings/SettingsWysiwyg/SettingsWysiwyg';
import SettingsContainer from '../../../components/Settings/SettingsContainer/SettingsContainer';

export default function PrivacyPolicy() {
    useHeader({
        path: ['/settings', '/settings/privacy-policy'],
        title: ['Settings', 'Privacy Policy']
    })
    return (
        <SettingsContainer wrapperStyle={{height: '100%'}}>
            <SettingsWysiwyg placeholder={'input privacy policy here'} params={'privacy-policy'} />
        </SettingsContainer>
    )
}