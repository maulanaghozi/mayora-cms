import React from 'react'
import { useParams } from 'react-router-dom'
import useHeader from '../../../hooks/useHeader/useHeader'
import PageTitle from '../../../components/PageTitle/PageTitle'
import { container, content, text } from './ViewStory.module.scss'

import { ReactComponent as UnderConstruction } from '../../../assets/under_construction.svg'

export default function PromoView(props) {
    const { id } = useParams()
    useHeader({
        path: ['/home-content', `/home-content/stories`, `/home-content/stories/${id}`],
        title: ['Home Content', 'Story', `${id}`]
    })
    return (
        <div className={container}>
            <PageTitle
                title={['View Story']}
                path={[`/home-content/stories/${id}`]}
                returnable={true}
                backTo={`/home-content/stories`}
            />
            <div className={content}>
                <UnderConstruction width={'70%'} height={'70%'} />
                <p className={text}>Under Construction</p>
            </div>
        </div>

    )
}