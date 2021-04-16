import React from 'react'
import style from './PortfolioForm.module.scss'

import Editor from '../HomeWysiwyg/HomeWysiwyg'

export default function Description(params) {
    return (
        <div className={style.container_form_description}>
            <p className={style.field_description}>Description :</p>
            <Editor
                placeholder={'input portfolio description here'}
                handleDescriptionChange={(plain) => {
                    params.setCreateCriteria({ description: plain })
                }}
                plainDescription={params.createCriteria.description}
                readOnly={!params.createCriteria.withDescription}
            />
        </div>
    )
}