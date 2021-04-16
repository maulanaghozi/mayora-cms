import React from 'react'
import style from './StoryForm.module.scss'

import Editor from '../HomeWysiwyg/HomeWysiwyg'

export default function Description(params) {
    return (
        <div className={style.container_form_description}>
            <p className={style.field_description}>Description :</p>
            <Editor
                placeholder={'input promo description here'}
                handleDescriptionChange={(plain, raw) => {
                    params.setStory({ plain_description: plain, raw_description: raw })
                }}
                plainDescription={params.story.plain_description}
                rawDescription={params.story.raw_description}
            />
        </div>
    )
}