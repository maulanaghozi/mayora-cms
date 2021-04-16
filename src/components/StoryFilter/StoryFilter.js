import React from 'react'
import InputSelect from '../InputSelect/InputSelect'
import InputDateRange from '../InputDateRange/InputDateRange'
import AddButton from '../AddButton/AddButton'

import style from './StoryFilter.module.scss'
import { arrayToOptions } from '../../utility/utility'


export default function StoryFilter(props) {
    return (
        <div className={style.container}>
            <div className={style.filter}>
                <InputSelect
                    className={style.select_input}
                    defaultValue={
                        props.searchCriteria.type ?
                        arrayToOptions(props.searchCriteria.type) :
                        []
                    }
                    options={[
                        { value: 'tutorials', label: 'Tutorials' },
                        { value: 'expert-says', label: 'Expert Says' },
                        { value: 'success-story', label: 'Success Story' }
                    ]}
                    onChange={selected => {
                        props.setSearchCriteria({
                            type: selected.map(el => el.value)
                        })
                    }}
                    isMulti={true}
                    placeholder={'Type'}
                />
                <InputSelect
                    className={style.select_input}
                    defaultValue={
                        props.searchCriteria.status ?
                        arrayToOptions(props.searchCriteria.status) :
                        []
                    }
                    options={[
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' }
                    ]}
                    onChange={selected => {
                        props.setSearchCriteria({
                            status: selected.map(el => el.value)
                        })
                    }}
                    isMulti={true}
                    placeholder={'Status'}
                />
                <InputDateRange
                    startDate={props.searchCriteria.publishDateStart}
                    setStartDate={publishDateStart => {
                        props.setSearchCriteria(
                            {publishDateStart}
                        )
                    }}
                    endDate={props.searchCriteria.publishDateEnd}
                    setEndDate={publishDateEnd => (
                        props.setSearchCriteria(
                            {publishDateEnd}
                        )
                    )}
                    prefix={'Published Date: '}
                    className={style.publish_date}
                    isClearable={true}
                    maxDate={false}
                />
            </div>
            <div className={style.add_button}>
                <AddButton text={'New Story'} to={'/home-content/stories/create'} />
            </div>
        </div>
    )
}