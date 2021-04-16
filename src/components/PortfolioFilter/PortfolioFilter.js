import React from 'react';
import InputSelect from '../InputSelect/InputSelect';
import InputDateRange from '../InputDateRange/InputDateRange';
import AddButton from '../AddButton/AddButton';

import style from './PortfolioFilter.module.scss';
import { arrayToOptions } from '../../utility/utility';


export default function StoryFilter(props) {
    return (
        <div className={style.container}>
            <div className={style.filter}>
                <InputSelect
                    className={style.select_input}
                    defaultValue={
                        props.searchCriteria.status ?
                        arrayToOptions(props.searchCriteria.status) :
                        []
                    }
                    options={[
                        { value: 'published', label: 'Active' },
                        { value: 'draft', label: 'Inactive' }
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
                <AddButton text={'New Portfolio'} to={'/home-content/portfolio/create'} />
            </div>
        </div>
    )
}