import React from 'react'
import PageTitle from '../../PageTitle/PageTitle'

export default function CreateCasting() {
    return (
        <div>
            <PageTitle title={["create new casting"]} path={["/casting/create-new-casting"]} returnable={true} backTo="/casting" />
        </div>
    )
}