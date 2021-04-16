import React from 'react'
import { container, img } from './Photo.module.scss'

export default function DetailRecruiter(props) {
    return (
        <div className={container}>
            <img className={img} src={'https://i.ibb.co/X8LSW3v/rectangle.png'} alt={'oke'} />
            <img className={img} src={'https://i.ibb.co/GTBwbBv/rectangle.png'} alt={'oke'} />
        </div>
    )
}