import React from 'react'
import moment from 'moment'
import { Switch, Redirect, Route, useParams, useRouteMatch } from 'react-router-dom'

import Navigation from '../../UserNavigation/UserNavigation'
import Detail from './Detail/Detail'
import Photo from './Photo/Photo'

import { phoneNumber, replaceString } from '../../../utility/utility'
import { ReactComponent as LocationIcon } from '../../../assets/user/map_pin.svg'
import { ReactComponent as PhoneIcon } from '../../../assets/user/phone.svg'
import { ReactComponent as MailIcon } from '../../../assets/user/mail.svg'
import { ReactComponent as QuoteIcon } from '../../../assets/user/quotation.svg'

import {
    container,
    flex,
    attribute,
    profile,
    name,
    profile_pic,
    address,
    location,
    phone,
    email,
    blueBold,
    fullname,
    username,
    desc,
    description,
    require
} from './RightSide.module.scss'


export default function RightSideTalentDetail({ data }) {
    const { user_id } = useParams()
    const { path, url } = useRouteMatch()

    return (
        <div className={container}>
            <React.Fragment>
                <div className={profile}>
                    <img src={data.profile_pic_url} alt="profile pic" className={profile_pic} />
                    <div className={name}>
                        <p className={fullname}>{data.name}</p>
                        <p className={username}>{data.username}</p>
                    </div>
                </div>
                <div className={address}>
                    <div className={location}>
                        <LocationIcon />
                        <p className={blueBold}>{data.location}</p>
                    </div>
                    <div className={phone}>
                        <PhoneIcon />
                        <p className={blueBold}>{phoneNumber(data.phone)}</p>
                    </div>
                    <div className={email}>
                        <MailIcon />
                        <p className={blueBold}>{data.email}</p>
                    </div>
                </div>
            </React.Fragment>
            <Navigation
                title={['details', 'photo']}
                path={[`/user/talent/${user_id}/detail`, `/user/talent/${user_id}/photo`]}
            />
            <Switch>
                <Route exact path={`${path}/detail`} component={Detail} />
                <Route exact path={`${path}/photo`} component={Photo} />
                <Route exact path={`${path}`} render={() => <Redirect to={`${url}/detail`} />} />
            </Switch>
        </div>
    )
}