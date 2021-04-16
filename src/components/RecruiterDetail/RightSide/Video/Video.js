import React from 'react'
import { container, img, video, play } from './Video.module.scss'

import PlayIcon from '../../../../assets/play_circle.svg'

export default function DetailRecruiter(props) {
    return (
        <div className={container}>
            <div className={video}>
                <img className={img} src={'https://i.ibb.co/X8LSW3v/rectangle.png'} alt={'posting'} />
                <img className={play} src={PlayIcon} alt={'play button'} />
            </div>
            <div className={video}>
                <img className={img} src={'https://i.ibb.co/GTBwbBv/rectangle.png'} alt={'posting'} />
                <img className={play} src={PlayIcon} alt={'play button'} />
            </div>
        </div>
    )
}