import React, { useState, useEffect } from 'react';
import {useAlert} from 'react-alert';
import { http } from '../../utility/http';

import HelpFilter from './HelpFilter/HelpFilter'; 
import HelpCardList from './HelpCardList/HelpCardList'; 
import HelpFooter from './HelpFooter/HelpFooter';

import { scrollable_container } from './HelpList.module.scss';

export default function HelpList() {
    const [searchCriteria, setSearchCriteria] = useState({});
    const [helpData, setHelpData] = useState([{status: 'open', created_at: 1579196945, content: 'test123', user_full_name: 'qbit'}])

    const alert = useAlert();

    useEffect(() => {
        fetchData(searchCriteria)
    }, [searchCriteria]);

    const fetchData = searchCriteria => {
        http({
            method: 'GET',
            path: 'prmotion/ticket',
            query: searchCriteria
        })
        .then(result => {
            if(result && result.code === 'success') {
                setHelpData(result.payload[0].rows);
            } else {
                alert.error('fetch data failed!')
            }
        })
    }

    const handleSearchCriteriaChange = newCriteria => {
        setSearchCriteria({
            ...searchCriteria,
            ...newCriteria
        })
    }

    return (
        <div className={scrollable_container}>
            <HelpFilter
                handleSearchCriteriaChange={handleSearchCriteriaChange}
            />
            <HelpCardList
                data={helpData}
            />
            <HelpFooter
                searchCriteria={searchCriteria}
                setSearchCriteria={setSearchCriteria}
                result={helpData}
            />
        </div>
    )
}
