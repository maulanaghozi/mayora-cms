import React from 'react'
import Table from './table'
import { container } from './Job.module.scss'
import data from './data.json'

export default function DetailRecruiter(props) {
    return (
        <div className={container}>
            <Table data={data.payload} />
        </div>
    )
}