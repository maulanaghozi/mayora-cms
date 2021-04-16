import React from 'react';
import SettingsWysiwyg from '../../../components/Settings/SettingsWysiwyg/SettingsWysiwyg';
import SettingsContainer from '../../../components/Settings/SettingsContainer/SettingsContainer';
import useHeader from '../../../hooks/useHeader/useHeader';

export default function TnC() {
    useHeader({
        path: ['/settings', '/settings/terms-n-conditions'],
        title: ['Settings', 'Terms & Conditions']
    })
    return (
        <SettingsContainer wrapperStyle={{height: '100%'}}>
            <SettingsWysiwyg placeholder={'input terms and conditions here'} params={'terms-n-conditions'} />
        </SettingsContainer>
    )
}