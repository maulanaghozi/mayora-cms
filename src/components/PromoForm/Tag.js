import React from 'react'
import InputTag from '../../components/InputTag/InputTag'
import { field, container_form, input, tag } from './PromoForm.module.scss'

export default function Tag(props) {
    return (
        <div className={container_form}>
            <div className={field}>
                <span>{'Tag :'}</span>
            </div>
            <InputTag
                onChange={props.handleTagChange}
                defaultValue={props.tag.map(entry => ({
                    label: entry,
                    value: entry
                }))}
                className={tag}
                menuMessage={'Type Promo Tag'}
                placeholder={'Input Tag...'}
            />
        </div>
    )
}