import React, { useState, useEffect, useRef } from 'react'
import LeftSide from './LeftSide/LeftSide'
import CenterSide from './CenterSide/CenterSide'
import RightSide from './RightSide/RightSide'

import { table_row_more } from '../RecruiterTable.module.scss'

export default function ExpandRow(props) {
    return (
        <div className={table_row_more}>
            <div style={{ width: '8%' }}></div>
            <LeftSide row={props.row} />
            <CenterSide row={props.row} />
            <RightSide row={props.row} />
        </div>
    )
}