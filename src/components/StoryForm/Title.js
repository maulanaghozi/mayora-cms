import React, { useState, useEffect } from 'react'
import InputText from '../InputText/InputText'
import { field, container_form, input_text } from './StoryForm.module.scss'

export default function Title(props) {
    return (
        <div className={container_form} >
            <p className={field}>Title :</p>
            <InputText
                name={'title'}
                placeholder={'Story...'}
                setValue={value => props.setStory({ title: value })}
                className={input_text}
                value={props.story.title}
            />
        </div>
    )
}