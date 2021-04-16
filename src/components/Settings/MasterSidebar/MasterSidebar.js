import React from 'react';

import CollapsableNavLink from './CollapsableNavLink/CollapsableNavLink';

import {ReactComponent as KestingrumIcon} from '../../../assets/box.svg'
import {ReactComponent as CastingIcon} from '../../../assets/casting_s.svg'
import {ReactComponent as TalentIcon} from '../../../assets/user_s.svg'
import {ReactComponent as RecruiterIcon} from '../../../assets/building.svg'

import { sidebar_container } from './MasterSidebar.module.scss';

export default function MasterSidebar() {
  return (
    <div className={sidebar_container}>
        <CollapsableNavLink
            name={'General'}
            Icon={KestingrumIcon}
            options={[
                {
                    name: 'Location',
                    apiUrl: 'profiles/master/location',
                    path: '/settings/master-data-details/location'
                }
            ]}
        />
        <CollapsableNavLink
            name={'Casting Job'}
            Icon={CastingIcon}
            options={[
                {
                    name: 'Production Type',
                    apirUrl: 'posting/master/production-type',
                    path: '/settings/master-data-details/production-type'
                },
                {
                    name: 'Job Role',
                    apiUrl: 'posting/master/job-role',
                    path: '/settings/master-data-details/job-role'
                },
            ]}
        />
        <CollapsableNavLink
            name={'Talent'}
            Icon={TalentIcon}
            options={[
                {
                    name: 'Ethnicity',
                    apirUrl: 'profiles/master/ethnicity',
                    path: '/settings/master-data-details/ethnicity'
                },
                {
                    name: 'Body Types',
                    apirUrl: 'profiles/master/body-type',
                    path: '/settings/master-data-details/body-type'
                },
                {
                    name: 'Hair',
                    apirUrl: 'profiles/master/hair-type',
                    path: '/settings/master-data-details/hair'
                },
                {
                    name: 'Skin',
                    apirUrl: 'profiles/master/skin-type',
                    path: '/settings/master-data-details/skin'
                },
                {
                    name: 'Clothes Size',
                    apirUrl: 'profiles/master/clothes-size',
                    path: '/settings/master-data-details/clothes-size'
                },
                {
                    name: 'Experience',
                    apirUrl: 'profiles/master/experience',
                    path: '/settings/master-data-details/experience'
                },
            ]}
        />
        <CollapsableNavLink
            name={'Recruiter'}
            Icon={RecruiterIcon}
            options={[
                {
                    name: 'Recruiter Type',
                    apirUrl: 'profiles/master/recruiter-type',
                    path: '/settings/master-data-details/recruiter-type'
                },
            ]}
        />
    </div>
  )
}
