import React, { useState, useEffect } from 'react';
import { useParams, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import useHeader from '../../../hooks/useHeader/useHeader';
import { debounce } from 'throttle-debounce';

import PageTitle from '../../../components/PageTitle/PageTitle';
import SmallCastingViewer from '../../../components/SmallCastingViewer/SmallCastingViewer';
import ApplicantViewer from '../../../components/ApplicantViewer/ApplicantViewer';

import style from './ViewApplicant.module.scss';
import useMasterData from '../../../hooks/useMasterData/useMasterData';
import {useAlert} from 'react-alert';
import {http} from '../../../utility/http';
import ApplicantFilter from '../../../components/ApplicantFilter/ApplicantFilter';
import Loading from '../../../components/Loading/Loading';

const ViewApplicant = props => {
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(20);
    const [location, setLocation] = useState(null);
    const [body_type, setBodyType] = useState(null);
    const [gender, setGender] = useState(null);
    const [min_age, setMinAge] = useState(null);
    const [max_age, setMaxAge] = useState(null);
    const [min_height, setMinHeight] = useState(null);
    const [max_height, setMaxHeight] = useState(null);
    const [min_weight, setMinWeight] = useState(null);
    const [max_weight, setMaxWeight] = useState(null);
    const [keyword, setKeyword] = useState(null);
    const [experience, setExperience] = useState(null);
    const [ethnicity, setEthnicity] = useState(null);
    const [skin_color, setSkinColor] = useState(null);
    const [hair_type, setHairType] = useState(null);
    const [agency, setAgency] = useState(null);
    const [applicant_status, setApplicantStatus] = useState('pending');
    const [sortBy, setSortBy] = useState('updated_at');
    const [order, setOrder] = useState('DESC');
    const [sessionId, setSessionId] = useState(Math.round(Math.random() * 100000));

    const [applicants, setApplicants] = useState(null);

    const alert = useAlert();

    const searchCriteria = {
        page,
        rows,
        location,
        body_type,
        gender,
        min_age,
        max_age,
        min_height,
        max_height,
        min_weight,
        max_weight,
        keyword,
        experience,
        ethnicity,
        skin_color,
        hair_type,
        agency,
        applicant_status,
        sortBy,
        order,
        sessionId
    }

    const setter = {
        page: setPage,
        rows: setRows,
        location: setLocation,
        body_type: setBodyType,
        gender: setGender,
        min_age: setMinAge,
        max_age: setMaxAge,
        min_height: setMinHeight,
        max_height: setMaxHeight,
        min_weight: setMinWeight,
        max_weight: setMaxWeight,
        keyword: setKeyword,
        experience: setExperience,
        ethnicity: setEthnicity,
        skin_color: setSkinColor,
        hair_type: setHairType,
        agency: setAgency,
        applicant_status: setApplicantStatus,
        sortBy: setSortBy,
        order: setOrder,
        sessionId: () => {setSessionId(Math.round(Math.random() * 100000))}
    }

    const setSearchCriteria = newCriteria => {
        for(let key in newCriteria) {
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

    const getApplicants = () => {
        const data = {}
        setApplicants(null);

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

        http({
            method: 'GET',
            path: 'posting/applicant/search/' + props.casting.casting_id,
            query: data
        })
        .then(result => {
            if (result && result.code === 'success') {
                setApplicants(result.payload);
            } else {
                alert.error('failed to fetch applicants')
            }
        })

    }

    const debouncedGetApplicant = debounce(200, getApplicants);

    useEffect(() => {
        debouncedGetApplicant();
    }, [
        page,
        rows,
        location,
        gender,
        min_age,
        max_age,
        min_height,
        min_weight,
        keyword,
        experience,
        ethnicity,
        skin_color,
        hair_type,
        agency,
        applicant_status,
        sessionId
    ])

    useHeader({
        path: ['/casting', `/casting/detail/${props.casting.casting_id}`, `/casting/view-applicant/${props.casting.casting_id}`],
        title: ['Casting', props.casting.title, 'View Applicant']
    })

    return (
        <>
            <SmallCastingViewer
                data={props.casting}
            />
            <ApplicantFilter
                masterData={props.masterData}
                searchCriteria={searchCriteria}
                setSearchCriteria={setSearchCriteria}
            />
            <div style={{position: 'relative', minWidth: '100%', minHeight: '100px'}}>
                {
                    applicants ?
                    <ApplicantViewer
                        data={applicants}
                        casting={props.casting}
                        searchCriteria={searchCriteria}
                        setSearchCriteria={setSearchCriteria}
                    /> :
                    <Loading radius={20} />
                }
            </div>
        </>
    )
}   

export default () => {
    const [casting, setCasting] = useState(null);
    const masterData = useMasterData();
    const { id } = useParams();

    const alert = useAlert();
    const routeLocation = useLocation();

    useEffect(() => {
        http({
            method: 'GET',
            path: 'posting/casting/' + id
        }).then(result => {
            if (result && result.code === 'success') {
                setCasting(result.payload);
            } else {
                if (result) {
                    alert.error(result);
                } else {
                    alert.error('something\'s wrong, please contact our administrator');
                }
            }
        });
    }, [])

    return (
        <div className={style.container}>
            <PageTitle
                path={[
                    `/casting/view-applicant/${id}`,
                    `/casting/view-comment/${id}`,
                    `/casting/view-like/${id}`,
                ]}
                title={[
                    'Applicant',
                    'Comment',
                    'Like'
                ]}
                returnable={true}
                backTo={(routeLocation.state && routeLocation.state.from) || '/casting'}
                separatorLine={true}
                className={style.page_title}
            />
            {
                (
                    casting &&
                    masterData
                ) ?
                <ViewApplicant
                    casting={casting}
                    masterData={masterData}
                /> :
                <div className={style.loading_container}>
                    <Loading />
                </div>
            }
        </div>
    )
}