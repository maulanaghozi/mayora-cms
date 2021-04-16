import React from 'react';
import CountSelector from '../../CountSelector/CountSelector';
import PageCounter from '../../PageCounter/PageCounter';
import PageSelector from '../../PageSelector/PageSelector';

import { selector_container, help_footer } from './HelpFooter.module.scss'

export default function HelpFooter(props) {
    return (
        <div className={help_footer}>
            <div className={selector_container}>
                <CountSelector
                    setRow={row => {
                        props.setSearchCriteria({
                            row: row
                        })
                    }}
                />
                <PageCounter
                    searchCriteria={props.searchCriteria}
                    result={props.result && props.result.payload}
                />
            </div>
            <PageSelector
                result={props.result && props.result.payload}
                setPage={page => {
                    props.setSearchCriteria({
                        ...props.searchCriteria,
                        page: page
                    })
                }}
            />
        </div>
    )
}
