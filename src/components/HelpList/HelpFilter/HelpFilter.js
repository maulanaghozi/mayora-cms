import React from 'react';

import InputSelect from '../../InputSelect/InputSelect';
import SearchBar from '../../SearchBar/SearchBar';

import { ReactComponent as SearchIcon } from '../../../assets/search.svg';

import {
    filter_container, select_sort, select_status, filter_filler
} from './HelpFilter.module.scss';

export default function HelpFilter(props) {
    const onSelectChange = inputValue => {
        props.handleSearchCriteriaChange({
            status: inputValue.value
        })
    }
    const onKeywordChange = keyword => {
        props.handleSearchCriteriaChange({
            keyword
        })
    }

    return (
        <div className={filter_container}>
            <SearchBar
                Icon={SearchIcon}
                name={'keyword'}
                setValue={onKeywordChange}
                placeholder={'Keywords'}
            />
            <InputSelect
                defaultValue={{
                    value: '',
                    label: 'All Status'
                }}
                options={[
                    {
                        value: '',
                        label: 'All Status'
                    },
                    {
                        value: 'open',
                        label: 'Open'
                    },
                    {
                        value: 'closed',
                        label: 'Closed'
                    }
                ]}
                onChange={onSelectChange}
                className={select_status}
            />
            <span>Sort By:</span>
            <InputSelect
                defaultValue={{
                    value: 'asc',
                    label: 'Latest'
                }}
                options={[
                    {
                        value: 'asc',
                        label: 'Latest'
                    },
                    {
                        value: 'desc',
                        label: 'Oldest'
                    }
                ]}
                onChange={onSelectChange}
                className={select_sort}
            />

        </div>
    )
}