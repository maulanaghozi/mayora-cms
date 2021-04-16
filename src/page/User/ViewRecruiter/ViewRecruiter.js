// Packages
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Components
import CoverSection from '../../../components/CoverSection/CoverSection';
import ProfileSection from "../../../components/ProfileSection/ProfileSectionRecruiter";

// Utility
import { http } from '../../../utility/http';
import PageTitle from '../../../components/PageTitle/PageTitle';

// Hooks
import useHeader from '../../../hooks/useHeader/useHeader';

// Style
import style, { container } from './ViewRecruiter.module.scss';
import { useAlert } from 'react-alert';

export default function ViewTalent() {
  const [result, setResult] = useState(null)
  const [name, setName] = useState(null)
  const { user_id } = useParams();
  const alert = useAlert();

  useHeader({
    title: ['user', 'recruiter', `${name ? name : user_id}`],
    path: ['/user/recruiter', '/user/recruiter', `/user/recruiter/${user_id}`]
  })

  useEffect(() => {
    getRecruiterDetail(user_id)
  }, [user_id])

  const getRecruiterDetail = (id) => {
    const params = {
      method: 'get',
      path: `profiles/recruiter/${id}`
    }

    http(params)
      .then(res => {
        if (res && res.code === 'success') {
          setName(res.payload.name)
          setResult(res.payload)
        } else {
          alert.error('failed to fetch recruiter data');
        }
      })
  }

    return (
        <div className={container}>
            <header>
                <PageTitle 
                  title={[`VIEW RECRUITER`]} 
                  path={[`/user/recruiter/${user_id}`]} 
                  returnable={true} 
                  backTo='/user/recruiter' />
            </header>
            {result && <main>
              <CoverSection
                className={style.cover_section} 
                data={result}
                isTalent={false}
              />
              <ProfileSection
                className={style.profile_section}
                data={result}
              />
            </main>}
        </div>
    )

}