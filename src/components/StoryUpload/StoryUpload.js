import React, { useEffect, useState } from 'react'
import InputText from '../InputText/InputText'

import { replaceString } from '../../utility/utility'

import style from './StoryUpload.module.scss'
import { ReactComponent as LinkIcon } from '../../assets/link.svg';
import YouTubePlayer from '../YouTubePlayer/YouTubePlayer';

export default function StoryUpload(props) {
    const publish = () => {
        props.submit('active');
    }

    const saveDraft = () => {
        props.submit('inactive');
    }

    return (
        <div className={style.container}>
            <p className={style.tagline}>video link</p>
            <div className={style.upload}>
                <div className={style.field_container}>
                    <p className={style.field}>Video : </p>
                    <YouTubePlayer key={props.story.video_url} videoUrl={props.story.video_url} />
                </div>
                <div className={style.field_container}>
                <p className={style.field}></p>
                    <LinkIcon />
                    <InputText
                        name={'vid_url'}
                        placeholder={'input link youtube here'}
                        setValue={value => props.setStory({ video_url: value })}
                        className={style.input}
                        value={props.story.video_url}
                    />
                </div>
            </div>
            <div className={style.button}>
                {
                    props.status === 'active' ?
                    <>
                        <button className={style.btnPublish} onClick={publish}>SAVE</button>
                    </> :
                    <>
                        <button className={style.btnSave} onClick={saveDraft}>SAVE AS DRAFT</button>
                        <button className={style.btnPublish} onClick={publish}>PUBLISH</button>
                    </>
                }
            </div>
        </div>
    )
}