import React from 'react';

import useHeader from '../../hooks/useHeader/useHeader';

import PageTitle from '../../components/PageTitle/PageTitle';
import HelpList from '../../components/HelpList/HelpList';

import { help_container, page_title } from './Help.module.scss'

export default function Help() {
    useHeader({
        title: ['Help'],
        path: ['']
    });

    return (
        <div className={help_container}>
            <PageTitle
                title={['Help List']}
                path={['']}
                className={page_title}
            />
            <HelpList />
        </div>
    )
}