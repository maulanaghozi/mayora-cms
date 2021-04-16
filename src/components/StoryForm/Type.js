import React from 'react'

import InputSelect from '../InputSelect/InputSelect'
import { field, container_form, input, select } from './StoryForm.module.scss'
import { replaceString, capitalize } from '../../utility/utility'

export default function Tag(params) {
    return (
        <div className={container_form}>
            <p className={field}>Type :</p>
            <InputSelect
                className={select}
                defaultValue={
                    params.story.type ? 
                    {
                        value: params.story.type,
                        label: capitalize(replaceString(params.story.type, '-', ' '))
                    } : {
                        value: '',
                        label: 'Select Story Type' 
                    }
                }
                options={[
                    { value: 'tutorials', label: 'Tutorials' },
                    { value: 'expert-says', label: 'Expert Says' },
                    { value: 'success-story', label: 'Success Story' }
                ]}
                onChange={selected => params.setStory({ type: selected.value })}
            />
        </div>
    )
}