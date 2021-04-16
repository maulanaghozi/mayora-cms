import React from 'react'
import { field, container_form, input } from './PromoForm.module.scss'

export default function Title({
    title,
    handleTitleChange
}) {
    return (
        <div className={container_form}>
            <div className={field}>
                <span>{'Title :'}</span>
            </div>
            <input
                name={'title'}
                type='text'
                placeholder='Promo...'
                className={input}
                onChange={handleTitleChange}
                autoComplete={'off'}
                value={title}
            />
        </div>
    )
}