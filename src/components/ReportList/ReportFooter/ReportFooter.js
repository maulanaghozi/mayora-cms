import React from 'react';
import CountSelector from '../../CountSelector/CountSelector';
import PageCounter from '../../PageCounter/PageCounter';
import PageSelector from '../../PageSelector/PageSelector';

import { selector_container, report_footer } from './ReportFooter.module.scss'

export default function ReportFooter(props) {
    return (
        <div className={report_footer}>
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
