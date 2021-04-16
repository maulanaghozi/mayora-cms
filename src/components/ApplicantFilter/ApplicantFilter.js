import React, { useState } from 'react';
import style from './ApplicantFilter.module.scss';
import classNames from 'classnames';
import SearchBar from '../SearchBar/SearchBar';
import InputSelect from '../InputSelect/InputSelect';
import {SearchIcon, ChevronDownBlue} from '../../assets/image';
import { capitalize, arrayToOptions } from '../../utility/utility';
import InputRange from '../InputRange/InputRange';

const applicantStatus = [
    'pending',
    'rejected',
    'shortlist',
    'cast'
]

export default function ApplicantFilter(props) {
    const [moreFiltersIsOpen, setMoreFiltersIsOpen] = useState(false);

    return (
        <div className={style.container}>
            <div className={style.status_filter_container}>
                {
                    applicantStatus.map(status => (
                        <div
                            key={status}
                            className={classNames(
                                style.status_filter,
                                {
                                    [style.selected]:
                                        props.searchCriteria
                                        .applicant_status === status
                                }
                            )}
                            onClick={() => {
                                props.setSearchCriteria({applicant_status: status})
                            }}
                        >
                            {status.toUpperCase()}
                        </div>
                    ))
                }
            </div>
            <div className={style.filter_container}>
                <SearchBar
                    name={'name_filter'}
                    placeholder={'Name / Username'}
                    setValue={keyword => {
                        props.setSearchCriteria({keyword})
                    }}
                    className={classNames(style.input, style.input_lg)}
                    Icon={SearchIcon}
                />
                <InputSelect
                    className={classNames(style.input, style.input_sm)}
                    isMulti={true}
                    defaultValue={arrayToOptions(props.searchCriteria.gender || [])
                    }
                    options={arrayToOptions(props.masterData.gender || [])}
                    onChange={inputValue => {
                        props.setSearchCriteria({
                            gender: inputValue.map(el => el.value)
                        })
                    }}
                    placeholder={'Pilih Gender'}
                />
                <InputSelect
                    className={classNames(style.input, style.input_md)}
                    isMulti={true}
                    defaultValue={arrayToOptions(props.searchCriteria.location || [])
                    }
                    options={arrayToOptions(props.masterData.location || [])}
                    onChange={inputValue => {
                        props.setSearchCriteria({
                            location: inputValue.map(el => el.value)
                        })
                    }}
                    placeholder={'Pilih Lokasi'}
                />
                <InputRange
                    className={classNames(
                        style.input,
                        style.range
                    )}
                    description={'Age Range'}
                    value={[
                        props.searchCriteria.min_age || 0,
                        props.searchCriteria.max_age || 120
                    ]}
                    min={0}
                    max={120}
                    step={1}
                    onChange={value => (
                        props.setSearchCriteria({
                            min_age: value[0],
                            max_age: value[1]
                        })
                    )}
                />
                {
                    moreFiltersIsOpen &&
                    <>
                        <InputRange
                            className={classNames(
                                style.input,
                                style.range
                            )}
                            description={'Height Range'}
                            value={[
                                props.searchCriteria.min_height || 40,
                                props.searchCriteria.max_height || 230
                            ]}
                            min={40}
                            max={230}
                            step={1}
                            onChange={value => (
                                props.setSearchCriteria({
                                    min_height: value[0],
                                    max_height: value[1]
                                })
                            )}
                        />
                        <InputRange
                            className={classNames(
                                style.input,
                                style.range
                            )}
                            description={'Weight Range'}
                            value={[
                                props.searchCriteria.min_weight || 0,
                                props.searchCriteria.max_weight || 300
                            ]}
                            min={0}
                            max={300}
                            step={1}
                            onChange={value => (
                                props.setSearchCriteria({
                                    min_weight: value[0],
                                    max_weight: value[1]
                                })
                            )}
                        />
                        <InputSelect
                            className={classNames(style.input, style.input_md)}
                            isMulti={true}
                            defaultValue={arrayToOptions(props.searchCriteria.experience || [])
                            }
                            options={arrayToOptions(props.masterData.experience || [])}
                            onChange={inputValue => {
                                props.setSearchCriteria({
                                    experience: inputValue.map(el => el.value)
                                })
                            }}
                            placeholder={'Pilih Pengalaman'}
                        />
                        <InputSelect
                            className={classNames(style.input, style.input_md)}
                            isMulti={true}
                            defaultValue={arrayToOptions(props.searchCriteria.ethnicity || [])
                            }
                            options={arrayToOptions(props.masterData.ethnicity || [])}
                            onChange={inputValue => {
                                props.setSearchCriteria({
                                    ethnicity: inputValue.map(el => el.value)
                                })
                            }}
                            placeholder={'Pilih Suku / Etnis'}
                        />
                        <InputSelect
                            className={classNames(style.input, style.input_md)}
                            isMulti={true}
                            defaultValue={arrayToOptions(props.searchCriteria.skin_color || [])
                            }
                            options={arrayToOptions(props.masterData.skinColor || [])}
                            onChange={inputValue => {
                                props.setSearchCriteria({
                                    skin_color: inputValue.map(el => el.value)
                                })
                            }}
                            placeholder={'Pilih Warna Kulit'}
                        />
                        <InputSelect
                            className={classNames(style.input, style.input_md)}
                            isMulti={true}
                            defaultValue={arrayToOptions(props.searchCriteria.hair_type || [])
                            }
                            options={arrayToOptions(props.masterData.hairType || [])}
                            onChange={inputValue => {
                                props.setSearchCriteria({
                                    hair_type: inputValue.map(el => el.value)
                                })
                            }}
                            placeholder={'Pilih Tipe Rambut'}
                        />
                        <InputSelect
                            className={classNames(style.input, style.input_md)}
                            isMulti={true}
                            defaultValue={arrayToOptions(props.searchCriteria.body_type || [])
                            }
                            options={arrayToOptions(props.masterData.bodyType || [])}
                            onChange={inputValue => {
                                props.setSearchCriteria({
                                    body_type: inputValue.map(el => el.value)
                                })
                            }}
                            placeholder={'Pilih Tipe Badan'}
                        />
                        <InputSelect
                            className={classNames(style.input, style.input_md)}
                            isMulti={true}
                            defaultValue={arrayToOptions(props.searchCriteria.agency || [])
                            }
                            options={arrayToOptions([
                                'Dengan Agency',
                                'Tanpa Agency'
                            ])}
                            onChange={inputValue => {
                                props.setSearchCriteria({
                                    agency: inputValue.map(el => el.value)
                                })
                            }}
                            placeholder={'Pilih Status Agency'}
                        />
                    </>
                }
                <div className={style.more_filters_container}>
                    <div
                        className={style.more_filters}
                        onClick={() => {
                            setMoreFiltersIsOpen(!moreFiltersIsOpen);
                        }}
                    >
                        {
                            moreFiltersIsOpen ?
                                'Less Filters' :
                                'More Filters'
                        }
                        <span>
                            <ChevronDownBlue
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
        </div>
    )
}
