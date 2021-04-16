import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import InputSelect from '../InputSelect/InputSelect';
import InputRange from '../InputRange/InputRange';
import InputDateRange from '../InputDateRange/InputDateRange';

import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as ChevronDown } from '../../assets/chevron_down.svg';
import {RupiahIcon} from '../../assets/image';

import style from './CastingFilter.module.scss';
import {
    arrayToOptions
} from '../../utility/utility';
import useMasterData from '../../hooks/useMasterData/useMasterData';

const Filter = props => {
    const [moreFiltersIsOpen, setMoreFiltersIsOpen] = useState(false);

    const handleClickToggle = () => {
        setMoreFiltersIsOpen(!moreFiltersIsOpen);
    }

    const masterSelect = (name, key, options = [], isArray = false) => {
        return (
            <InputSelect
                className={style.select}
                defaultValue={arrayToOptions(props.searchCriteria[key] || [])}
                placeholder={name}
                options={[
                    ...arrayToOptions(options)
                ]}
                onChange={ selected => {
                    props.handleSearchCriteriaChange(
                        {
                            [key]: selected.map(entry => entry.value)
                        }
                    )
                }}
                isMulti={true}
            />
        )
    }

    return (
        <div className={style.container}>
            <div className={style.filter}>
                <SearchBar
                    className={style.searchbar}
                    Icon={SearchIcon}
                    placeholder={'Title'}
                    name={'keyword'}
                    setValue={
                        keyword => props.handleSearchCriteriaChange({keyword})
                    }
                />
                {
                    masterSelect(
                        'Types',
                        'type',
                        ['kestingrum', 'casting_call']
                    )
                }
                {
                    masterSelect(
                        'Production Type',
                        'production_type',
                        props.master.productionType,
                        true
                    )
                }
                {
                    masterSelect(
                        'Status',
                        'status',
                        ['draft', 'published']
                    )
                }
                {
                    moreFiltersIsOpen &&
                    <>
                        {
                            masterSelect(
                                'Role',
                                'job_role',
                                props.master.jobRole,
                                true
                            )
                        }
                        {
                            masterSelect(
                                'Location',
                                'location',
                                props.master.location,
                                true
                            )
                        }
                        <InputDateRange
                            startDate={props.searchCriteria.due_date_start}
                            setStartDate={due_date_start => {
                                props.handleSearchCriteriaChange(
                                    {due_date_start}
                                )
                            }}
                            endDate={props.searchCriteria.due_date_end}
                            setEndDate={due_date_end => (
                                props.handleSearchCriteriaChange(
                                    {due_date_end}
                                )
                            )}
                            prefix={'Due Date: '}
                            className={style.due_date}
                            isClearable={true}
                            maxDate={false}
                        />
                        <SearchBar
                            className={style.searchbar}
                            Icon={RupiahIcon}
                            placeholder={'Minimum Fee'}
                            name={'minimum_fee'}
                            setValue={minimum_fee => (
                                props.handleSearchCriteriaChange(
                                    {minimum_fee}
                                )
                            )}
                        />
                        {
                            masterSelect(
                                'Gender',
                                'gender',
                                props.master.gender,
                                true
                            )
                        }
                        <InputRange
                            className={style.range}
                            description={'Age'}
                            value={[
                                props.searchCriteria.min_age || 0,
                                props.searchCriteria.max_age || 120
                            ]}
                            min={0}
                            max={120}
                            step={1}
                            onChange={value => (
                                props.handleSearchCriteriaChange(
                                    {
                                        min_age: value[0],
                                        max_age: value[1]
                                    }
                                )
                            )}
                        />
                        <InputRange
                            className={style.range}
                            description={'Height (cm)'}
                            value={[
                                props.searchCriteria.min_height || 40,
                                props.searchCriteria.max_height || 230
                            ]}
                            min={40}
                            max={230}
                            step={1}
                            onChange={value => {
                                return props.handleSearchCriteriaChange(
                                    {
                                        min_height: value[0],
                                        max_height: value[1]
                                    }
                                )
                            }}
                        />
                        <InputRange
                            className={style.range}
                            description={'Weight (kg)'}
                            value={[
                                props.searchCriteria.min_weight || 0,
                                props.searchCriteria.max_weight || 300
                            ]}
                            min={0}
                            max={300}
                            step={1}
                            onChange={value => (
                                props.handleSearchCriteriaChange(
                                    {
                                        min_weight: value[0],
                                        max_weight: value[1]
                                    }
                                )
                            )}
                        />
                        {
                            masterSelect(
                                'Experience',
                                'experience',
                                props.master.experience
                            )
                        }
                    </>
                }
            </div>
            <div    
                onClick={handleClickToggle}
                className={style.toggle_container}
            >
                <div className={style.toggle}>
                    {
                        moreFiltersIsOpen ?
                            'Less Filters' :
                            'More Filters'
                    }
                    <span>
                        <ChevronDown
                            width={14}
                            height={5}
                            transform={
                                'scale(1,' +
                                (moreFiltersIsOpen ? '-1)' : '1)')
                            }
                        />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default function CastingFilter(props) {
    const masterData = useMasterData();

    return (
        <>{
            masterData &&
            <Filter {...props} master={masterData} />
        }</>
    )
}