import React from 'react'
import { useParams } from 'react-router-dom'
import useHeader from '../../../hooks/useHeader/useHeader'

import { ReactComponent as Under_Construction } from '../../../assets/under_construction.svg'
import { container, text } from './ViewLike.module.scss'

export default function ViewComment() {
    const { name } = useParams()
    useHeader({
        path: ['/casting', `/casting/${name}`, `/casting/${name}/view/like`],
        title: ['Casting', name, `View Like`]
    })
    return (
        <div className={container}>
            <Under_Construction width={'70%'} height={'70%'} />
            <p className={text}>Under Construction</p>
        </div>
    )
}