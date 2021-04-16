import React from 'react'
import { container, tagline } from './StoryForm.module.scss'

import Title from './Title'
import Type from './Type'
import Description from './Description'

export default function StoryForm(params) {
    return (
        <div className={container}>
            <p className={tagline}>{"STORY DETAILS"}</p>
            <Title story={params.story} setStory={params.setStory} />
            <Type story={params.story} setStory={params.setStory} />
            <Description story={params.story} setStory={params.setStory} />
        </div>
    )
}