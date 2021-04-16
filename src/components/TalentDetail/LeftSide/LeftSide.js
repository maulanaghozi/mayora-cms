import React from 'react'
import { blueBold, flex, text, group, cover } from './LeftSide.module.scss'

export default function LeftSideTalentDetail({ data }) {
    return (
        <div>
            <img src={data.cover_pic_url} alt="bg pic" className={cover} />
            <div className={group}>
                <div className={flex}>
                    <p className={blueBold}>{data.casting ? data.casting : 0}</p>
                    <p className={text}>casting</p>
                </div>
                <div className={flex}>
                    <p className={blueBold}>{data.followers ? data.followers : 0}</p>
                    <p className={text}>followers</p>
                </div>
                <div className={flex}>
                    <p className={blueBold}>{data.following ? data.following : 0}</p>
                    <p className={text}>following</p>
                </div>
            </div>
        </div>
    )
}