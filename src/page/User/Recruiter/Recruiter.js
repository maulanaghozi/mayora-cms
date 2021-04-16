// Packages
import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { ReactComponent as SearchIcon } from '../../../assets/search.svg'

// Components
import PageTitle from '../../../components/PageTitle/PageTitle'
import RecruiterTable from '../../../components/RecruiterTable/RecruiterTable'
import PageCounter from '../../../components/PageCounter/PageCounter'
import PageSelector from '../../../components/PageSelector/PageSelector'
import CountSelector from '../../../components/CountSelector/CountSelector'
import RecruiterFilter from '../../../components/RecruiterFilter/RecruiterFilter';

// Utility
import { http } from '../../../utility/http'

// Hooks
import useHeader from '../../../hooks/useHeader/useHeader';

// Style
import { container, filter, search, footer, select } from './Recruiter.module.scss'

export default function RecruiterPage() {
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);
    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState(null);
    const [location, setLocation] = useState(null);
    const [recruiter_type, setRecruiterType] = useState(null);
    const [sortBy, setSortBy] = useState("updated_at");
    const [order, setOrder] = useState("DESC");
    const [sessionId, setSessionId] = useState(Math.round(Math.random() * 100000));

    const [result, setResult] = useState(null)
    const alert = useAlert()

    const searchCriteria = {
        page,
        rows,
        keyword,
        status,
        location,
        recruiter_type,
        sortBy,
        order,
        sessionId
    }
    const setter = {
        page: setPage,
        rows: setRows,
        keyword: setKeyword,
        status: setStatus,
        location: setLocation,
        recruiter_type: setRecruiterType,
        sortBy: setSortBy,
        order: setOrder,
        sessionId: () => { setSessionId(Math.round(Math.random() * 100000)) }
    }

    useHeader({
        title: ['user', 'recruiter'],
        path: ['/user/recruiter', '/user/recruiter']
    })

    useEffect(() => {
        getRecruiterData()
    }, [
        page,
        rows,
        keyword,
        status,
        location,
        recruiter_type,
        sortBy,
        order,
        sessionId
    ])

    const getRecruiterData = () => {
        const data = {}
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

        data.status = ['active', 'unconfirmed', 'blocked']

        const params = {
            method: 'get',
            path: `profiles/recruiter/search`,
            query: data
        }

        http(params).then(res => {
            if (res && res.code === 'success') {
                setResult(res.payload)
            } else {
                alert.error('Fetch Data Gagal');
            }
        })
    }

    const setSearchCriteria = newCriteria => {
        for (let key in newCriteria) {
          if (
              Array.isArray(newCriteria[key]) ||
              typeof newCriteria[key] === 'number' ||
              typeof newCriteria[key] === 'string'
          ) {
              if (typeof setter[key] === 'function') {
                  setter[key](newCriteria[key]);
              } else {
                  if (process.env.NODE_ENV === 'development') {
                      console.error('setter.' + key + ' is not a function');
                  }
              }
          }
        }
      }

    return (
        <div className={container}>
            <PageTitle title={['talent', 'recruiter']} path={['/user/talent', '/user/recruiter']} returnable={false} />
            <RecruiterFilter
                setSearchCriteria={setSearchCriteria}
                searchCriteria={searchCriteria}
            />
            {result && Array.isArray(result.rows) && 
                <RecruiterTable 
                    data={result.rows} 
                    searchCriteria={searchCriteria}
                    setSearchCriteria={setSearchCriteria}
                    setSessionId={() => setSearchCriteria({ sessionId : sessionId })}
                />
            }
            <div className={footer}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CountSelector setRow={rows => { setSearchCriteria({rows})}} />
                    <PageCounter searchCriteria={searchCriteria} result={result} />
                </div>
                <PageSelector result={result} setPage={page => { setSearchCriteria({page}) }} />
            </div>
        </div>
    )
}