import React from 'react'
import LeftSide from './LeftSide/LeftSide'
import RightSide from './RightSide/RightSide'

import { container } from './TalentDetail.module.scss'

export default function TalentDetailComponent({ data }) {
    return (
        <div className={container}>
            <LeftSide data={data} />
            <RightSide data={data} />
        </div>
    )
}