import React from 'react';
import style from './GroupFilter.module.scss';
import classNames from 'classnames';
import SearchBar from '../SearchBar/SearchBar';
import InputSelect from '../InputSelect/InputSelect';
import {SearchIcon} from '../../assets/image';
import {arrayToOptions } from '../../utility/utility';

export default function GroupFilter(props) {
    return (
        <div className={style.filter_container}>
            <SearchBar
                name={'keyword_filter'}
                placeholder={'Group Name'}
                setValue={keyword => {
                    props.setSearchCriteria({keyword})
                }}
                className={classNames(style.input, style.input_lg)}
                Icon={SearchIcon}
            />
            {
                (props.type === 'private') &&
                <>
                    <InputSelect
                        className={classNames(style.input, style.input_sm)}
                        isMulti={true}
                        defaultValue={arrayToOptions(props.searchCriteria.status || [])
                        }
                        options={[
                            {
                                value: 'active',
                                label: 'Active'
                            },
                            {
                                value: 'inactive',
                                label: 'Inactive'
                            },
                            {
                                value: 'blocked',
                                label: 'Blocked'
                            }
                        ]}
                        onChange={inputValue => {
                            props.setSearchCriteria({
                                status: inputValue.map(el => el.value)
                            })
                        }}
                        placeholder={'Status'}
                    />
                    <InputSelect
                        className={classNames(style.input, style.input_sm)}
                        isMulti={true}
                        defaultValue={arrayToOptions(props.searchCriteria.type || [])
                        }
                        options={[
                            {
                                value: 'public',
                                label: 'Public'
                            },
                            {
                                value: 'private',
                                label: 'Private'
                            }
                        ]}
                        onChange={inputValue => {
                            props.setSearchCriteria({
                                type: inputValue.map(el => el.value)
                            })
                        }}
                        placeholder={'Type'}
                    />
                </>
            }
        </div>
    )
}