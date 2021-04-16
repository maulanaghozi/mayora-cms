import React from 'react';

import InputSelect from '../../InputSelect/InputSelect';
import SearchBar from '../../SearchBar/SearchBar';

import { ReactComponent as SearchIcon } from '../../../assets/search.svg';

import style from './ReportFilter.module.scss';
import { arrayToOptions } from '../../../utility/utility';

export default function ReportFilter(props) {
    return (
        <div className={style.filter_container}>
            <SearchBar
                Icon={SearchIcon}
                name={'keyword'}
                setValue={keyword => props.setSearchCriteria({keyword})}
                placeholder={'Keywords'}
                className={style.keyword}
            />
            <InputSelect
                defaultValue={
                    Array.isArray(props.searchCriteria.parent_type) ?
                    arrayToOptions(props.searchCriteria.parent_type) :
                    []
                }
                options={arrayToOptions([
                    'talent',
                    'recruiter',
                    'profile_post',
                    'group',
                    'group_post',
                    'casting',
                    'comment'
                ])}
                onChange={selected => {
                    props.setSearchCriteria(
                        {parent_type: selected.map(entry => entry.value)}
                    )
                }}
                className={style.select_category}
                placeholder={'All Category'}
                isMulti={true}
            />
            <div className={style.sort_container}>
                <span className={style.sort_label}>Sort By:</span>
                <InputSelect
                    defaultValue={{
                        value: {sortBy: 'created_at', order: 'DESC'},
                        label: 'Latest'
                    }}
                    options={[
                        {
                            value: {sortBy: 'created_at', order: 'DESC'},
                            label: 'Latest'
                        },
                        {
                            value: {sortBy: 'created_at', order: 'ASC'},
                            label: 'Oldest'
                        }
                    ]}
                    onChange={selected => {props.setSearchCriteria(selected.value)}}
                    className={style.select_sort}
                />
            </div>

        </div>
    )
}