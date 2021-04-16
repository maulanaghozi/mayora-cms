// Packages
import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';

// Components
import PageTitle from '../../../components/PageTitle/PageTitle';
import TalentTable from '../../../components/TalentTable/TalentTable';
import TalentFilter from '../../../components/TalentFilter/TalentFilter';
import Pagination from '../../../components/Pagination/Pagination';

// Utility
import { http } from '../../../utility/http';

// Hooks
import useHeader from '../../../hooks/useHeader/useHeader';

// Style
import { container } from './Talent.module.scss';

export default function TalentPage() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [name, setName] = useState("");
  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState(null);
  const [gender, setGender] = useState(null);
  const [max_age, setMaxAge] = useState(null);
  const [min_age, setMinAge] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [experience, setExperience] = useState(null);
  const [max_height, setMaxHeight] = useState(null);
  const [min_height, setMinHeight] = useState(null)
  const [min_weight, setMinWeight] = useState(null);
  const [max_weight, setMaxWeight] = useState(null);
  const [ethnicity, setEthnicity] = useState(null);
  const [skin_color, setSkinColor] = useState(null);
  const [hair_type, setHairType] = useState(null);
  const [body_type, setBodyType] = useState(null);
  const [agency, setAgency] = useState(null);
  const [sortBy, setSortBy] = useState("updated_at");
  const [order, setOrder] = useState("DESC");
  const [sessionId, setSessionId] = useState(Math.round(Math.random() * 100000));

  const [result, setResult] = useState(null)
  const alert = useAlert()

  const searchCriteria = {
    page,
    rows,
    name,
    status,
    location,
    gender,
    max_age,
    min_age,
    keyword,
    ethnicity,
    experience,
    max_height,
    min_height,
    min_weight,
    max_weight,
    ethnicity,
    skin_color,
    hair_type,
    body_type,
    agency,
    sortBy,
    order,
    sessionId
}

  const setter = {
    page: setPage,
    rows: setRows,
    name: setName,
    status: setStatus,
    location: setLocation,
    gender: setGender,
    max_age: setMaxAge,
    min_age: setMinAge,
    keyword: setKeyword,
    ethnicity: setEthnicity,
    experience: setExperience,
    max_height: setMaxHeight,
    min_height: setMinHeight,
    max_weight: setMaxWeight,
    min_weight: setMinWeight,
    ethnicity: setEthnicity,
    skin_color: setSkinColor,
    hair_type: setHairType,
    body_type: setBodyType,
    agency : setAgency,
    sortBy: setSortBy,
    order: setOrder,
    sessionId: () => { setSessionId(Math.round(Math.random() * 100000)) }
}

  useHeader({
    title: ['user', 'talent'],
    path: ['/user', 'user/talent']
  })

  useEffect(() => {
    getTalents()
  }, [
    page,
    rows,
    name,
    status,
    gender,
    location,
    min_height,
    max_height,
    min_age,
    max_age,
    min_weight,
    max_weight,
    keyword,
    ethnicity,
    experience,
    skin_color,
    hair_type,
    body_type,
    agency,
    sortBy,
    order,
    sessionId
  ])

  const getTalents = () => {
    const data = {
      includeStatistic: true
    }
    for (let key in searchCriteria) {
      if (
          (
            typeof searchCriteria[key] === 'string' ||
            typeof searchCriteria[key] === 'number' ||
          (
            Array.isArray(searchCriteria[key]) &&
            searchCriteria[key].length > 0
          )
          ) &&
          key !== 'sessionId'
      ) {
        data[key] = searchCriteria[key];
      }
    }

    const params = {
      method: 'get',
      path: `profiles/talent/search`,
      query: data
    }

    return http(params)
      .then(res => {
        if (res && res.code === 'success') {
          setResult(res.payload)
        } else {
          alert.error('Fatch Data Gagal')
        }
      })
  }

  const setSearchCriteria = newCriteria => {
    for (let key in newCriteria) {
      if (typeof setter[key] === 'function') {
        setter[key](newCriteria[key]);
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error('setter.' + key + ' is not a function');
        }
      }
    }
  }

  return (
    <div className={container}>
      <PageTitle 
        title={['talent', 'recruiter']} 
        path={['/user/talent', '/user/recruiter']} 
        returnable={false} 
      />
      <TalentFilter
        setSearchCriteria={setSearchCriteria}
        searchCriteria={searchCriteria}
      />
      {result && Array.isArray(result.rows) &&
        <TalentTable 
          data={result.rows}
          searchCriteria={searchCriteria}
          setSearchCriteria={setSearchCriteria}
          setSessionId={() => setSearchCriteria({ sessionId : Math.round(Math.random() * 100000) })}
        />
      }
      <Pagination
        data={result}
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
      />
    </div>
  )
}