import React from 'react'
import moment from 'moment'
import { Switch, Route, Redirect, useParams } from 'react-router-dom'

import Navigaton from '../../UserNavigation/UserNavigation'
import Detail from './Detail/Detail'
import Job from './Job/Job'
import Photo from './Photo/Photo'
import Video from './Video/Video'

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
    return (
        <div className={container}>
            <React.Fragment>
                <div className={profile}>
                    <img src={data.pr_pic} alt="profile pic" className={profile_pic} />
                    <div className={name}>
                        <p className={fullname}>{data.company_name}</p>
                        <p className={username}>{data.user_name}</p>
                    </div>
                </div>
                <div className={address}>
                    <div className={location}>
                        <LocationIcon />
                        <p className={blueBold}>{data.lokasi}</p>
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
            <Navigaton
                title={['details', 'job', 'photo', 'video']}
                path={[`/user/recruiter/${user_id}/detail`, `/user/recruiter/${user_id}/job`, `/user/recruiter/${user_id}/photo`, `/user/recruiter/${user_id}/video`]}
            />
            <Switch>
                <Route exact path={`/user/recruiter/:user_id/detail`} component={Detail} />
                <Route exact path={`/user/recruiter/:user_id/job`} component={Job} />
                <Route exact path={`/user/recruiter/:user_id/photo`} component={Photo} />
                <Route exact path={`/user/recruiter/:user_id/video`} component={Video} />
                <Route exact path={`/user/recruiter/:user_id`} render={() => <Redirect to={`/user/recruiter/${user_id}/detail`} />} />
            </Switch>

        </div>
    )
}