import React, { useState } from 'react';
import style from './TalentFilter.module.scss';
import classNames from 'classnames';
import SearchBar from '../SearchBar/SearchBar';
import InputSelect from '../InputSelect/InputSelect';
import {SearchIcon, ChevronDownBlue} from '../../assets/image';
import { capitalize, arrayToOptions } from '../../utility/utility';
import InputRange from '../InputRange/InputRange';
import useMasterData from '../../hooks/useMasterData/useMasterData';

const Filter = props => {
    const [moreFiltersIsOpen, setMoreFiltersIsOpen] = useState(false);

    const masterSelect = (name, key, options = [], isArray = true, classes) => {
        return (
          <InputSelect
            className={classNames(style.input, classes)}
            defaultValue={arrayToOptions(props.searchCriteria[key] || [])}
            placeholder={"Pilih "+ name}
            options={[...arrayToOptions(options)]}
            onChange={selected => {
              props.setSearchCriteria({
                [key] : selected.map(entry => entry.value)
              })
            }}
            isMulti={isArray}
            isFilter={true}
          />
        );
      };

    return (
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
            {masterSelect(
                "Gender",
                "gender",
                props.masterData.gender,
                true,
                style.input_sm
            )}
            {masterSelect(
                "Lokasi",
                "location",
                props.masterData.location,
                true,
                style.input_md
            )}
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
                        min_age: value[0] === 0 ? null : value[0],
                        max_age: value[1] === 120 ? null : value[1]
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
                                min_height: value[0] === 40 ? null : value[0],
                                max_height: value[1] === 230 ? null : value[1]
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
                        onChange={value => {
                            props.setSearchCriteria({
                                min_weight: (value[0] === 0) ? null : value[0],
                                max_weight: (value[1] === 300 )? null : value[1]
                            })
                        }}
                    />
                    {masterSelect(
                        "Pengalaman",
                        "experience",
                        props.masterData.experience,
                        true,
                        style.input_md
                    )}
                    {masterSelect(
                        "Suku / Etnis",
                        "ethnicity",
                        props.masterData.ethnicity,
                        true,
                        style.input_md
                    )}
                    {masterSelect(
                        "Warna Kulit",
                        "skin_color",
                        props.masterData.skinColor,
                        true,
                        style.input_md
                    )}
                    {masterSelect(
                        "Tipe Rambut",
                        "hair_type",
                        props.masterData.hairType,
                        true,
                        style.input_md
                    )}
                    {masterSelect(
                        "Tipe Badan",
                        "body_type",
                        props.masterData.bodyType,
                        true,
                        style.input_md
                    )}
                    {/* <InputSelect
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
                    /> */}
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
    )
}

export default function TalentFilter(props) {
    const masterData = useMasterData();

    return (
        <>{
            masterData &&
            <Filter {...props} masterData={masterData} />
        }</>
    )
}