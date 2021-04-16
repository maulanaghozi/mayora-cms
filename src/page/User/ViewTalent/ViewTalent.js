// Packages
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Components
import CoverSection from '../../../components/CoverSection/CoverSection';
import ProfileSection from "../../../components/ProfileSection/ProfileSectionTalent";

// Utility
import { http } from '../../../utility/http';
import PageTitle from '../../../components/PageTitle/PageTitle';

// Hooks
import useHeader from '../../../hooks/useHeader/useHeader';

// Style
import style, { container } from './ViewTalent.module.scss';
import { useAlert } from 'react-alert';

function ViewTalent(props) {
  useHeader({
    title: ['user', 'talent', `${props.data.name}`],
    path: ['/user/telent', '/user/talent', `/user/talent/${props.data.user_id}`]
  })

    return (
        <div className={container}>
            <header>
                <PageTitle 
                  title={[`VIEW TALENT`]} 
                  path={[`/user/talent/${props.data.user_id}`]} 
                  returnable={true} 
                  backTo='/user/talent' />
            </header>
            {props.data && <main>
              <CoverSection
                className={style.cover_section} 
                data={props.data}
                isTalent={true}
              />
              <ProfileSection
                className={style.profile_section}
                data={props.data}
              />
            </main>}
        </div>
    )

}

export default function ViewTalentWrapper() {
  const [result, setResult] = useState(null);
  const alert = useAlert();

  const { user_id } = useParams();

  useEffect(() => {
    getTalentDetail(user_id);
  }, [user_id])

  const getTalentDetail = (id) => {
    const params = {
      method: 'get',
      path: `profiles/talent/${id}`
    }

    http(params)
      .then(res => {
        if (res && res.code === 'success') {
          setResult(res.payload);
        } else {
          alert.error('failed to fetch user data');
          console.error('failed to fetch user data');
        }
      })
  }

  return (
    <>
      {result && <ViewTalent data={result} />}
    </>
  )
}