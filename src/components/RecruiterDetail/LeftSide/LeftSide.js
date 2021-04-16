import React from 'react'
import { blueBold, flex, text, group, cover, sosial } from './LeftSide.module.scss'

import InstagramIcon from '../../../assets/instagram.svg'
import TwitterIcon from '../../../assets/twitter.svg'
import FacebookIcon from '../../../assets/facebook.svg'

export default function LeftSideTalentDetail({ data }) {
    return (
        <div>
            <img src={data.bg_pic} alt="bg pic" className={cover} />
            <div className={group}>
                <div className={flex}>
                    <p className={blueBold}>{data.job_post}</p>
                    <p className={text}>job post</p>
                </div>
                <div className={flex}>
                    <p className={blueBold}>{data.followers}</p>
                    <p className={text}>followers</p>
                </div>
                <div className={flex}>
                    <p className={blueBold}>{data.follow}</p>
                    <p className={text}>following</p>
                </div>
            </div>
            <div className={sosial}>
                <p>Socials</p>
                <div>
                    <img src={InstagramIcon} />
                    <img src={TwitterIcon} />
                    <img src={FacebookIcon} />
                </div>
            </div>
        </div>
    )
}