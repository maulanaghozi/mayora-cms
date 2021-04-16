import React, { useState, useEffect } from 'react';
import useHeader from '../../../hooks/useHeader/useHeader';

import PageTitle from '../../../components/PageTitle/PageTitle';
import CastingForm from '../../../components/CastingForm/CastingForm';
import style from './EditCasting.module.scss';
import { snakeToPascal } from '../../../utility/utility';
import moment from 'moment';
import {http} from '../../../utility/http';
import Loading from '../../../components/Loading/Loading';
import BoxButton from '../../../components/BoxButton/BoxButton';
import { useAlert } from 'react-alert';
import { Redirect, useParams } from 'react-router-dom';
import numeral from 'numeral';
import {Prompt} from 'react-router-dom';

export default function EditCasting() {
    // page state
    const [currentState, setCurrentState] = useState('loading');
    const [done, setDone] = useState(false);
    const [isModified, setIsModified] = useState(undefined);
    const {id} = useParams();

    const [casting_id, setCastingId] = useState(null);
    const [status, setStatus] = useState(null);

    // upload brief form
    const [brief, setBrief] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [max_video, setMaxVideo] = useState(null);

    // job detail form
    const [type, setType] = useState('kestingrum');
    const [production_type, setProductionType] = useState(null);
    const [other_production_type, setOtherProductionType] = useState(null);
    const [title, setTitle] = useState('');
    const [job_role, setJobRole] = useState(null);
    const [gender, setGender] = useState(null);
    const [min_age, setMinAge] = useState(0);
    const [max_age, setMaxAge] = useState(120);
    const [description, setDescription] = useState('');
    const [due_date_open, setDueDateOpen] = useState(0);
    const [due_date, setDueDate] = useState(moment().add(1, 'month').unix());
    const [shooting_date_tbc, setShootingDateTbc] = useState(0);
    const [shooting_date_start, setShootingDateStart] = useState(moment().add(4, 'week').unix());
    const [shooting_date_end, setShootingDateEnd] = useState(moment().add(6, 'week').unix());
    const [location, setLocation] = useState(null);

    // other requirement
    const [wardrobe_date, setWardrobeDate] = useState('');
    const [workshop_date, setWorkshopDate] = useState('');
    const [fee, setFee] = useState(null);
    const [media, setMedia] = useState(null);
    const [min_height, setMinHeight] = useState(0);
    const [max_height, setMaxHeight] = useState(230);
    const [min_weight, setMinWeight] = useState(0);
    const [max_weight, setMaxWeight] = useState(300);
    const [skin_color, setSkinColor] = useState(null);
    const [hair_type, setHairType] = useState(null);
    const [body_type, setBodyType] = useState(null);
    const [ethnicity, setEthnicity] = useState(null);
    const [agency, setAgency] = useState(0);
    const [experience, setExperience] = useState(null);
    const [skill, setSkill] = useState(null);

    // master
    const [masterProductionType, setMasterProductionType] = useState(null);
    const [masterJobRole, setMasterJobRole] = useState(null);
    const [masterBodyType, setMasterBodyType] = useState(null);
    const [masterEthnicity, setMasterEthnicity] = useState(null);
    const [masterExperience, setMasterExperience] = useState(null);
    const [masterGender, setMasterGender] = useState(null);
    const [masterHairType, setMasterHairType] = useState(null);
    const [masterLocation, setMasterLocation] = useState(null);
    const [masterSkinColor, setMasterSkinColor] = useState(null);

    useEffect(() => {
        if (isModified === undefined) {
            setIsModified(null);
        }

        if (isModified === null) {
            setIsModified(false);
        }

        if (isModified === false) {
            setIsModified(true);
        }
    }, [
        casting_id,
        brief,
        thumbnail,
        max_video,
        type,
        production_type,
        other_production_type,
        title,
        job_role,
        gender,
        min_age,
        max_age,
        description,
        due_date_open,
        due_date,
        shooting_date_tbc,
        shooting_date_start,
        shooting_date_end,
        location,
        wardrobe_date,
        workshop_date,
        fee,
        media,
        min_height,
        max_height,
        min_weight,
        max_weight,
        skin_color,
        hair_type,
        body_type,
        ethnicity,
        agency,
        experience,
        skill,
        status
    ])

    const castingCriteria = {
        casting_id,
        brief,
        thumbnail,
        max_video,
        type,
        production_type,
        other_production_type,
        title,
        job_role,
        gender,
        min_age,
        max_age,
        description,
        due_date_open,
        due_date,
        shooting_date_tbc,
        shooting_date_start,
        shooting_date_end,
        location,
        wardrobe_date,
        workshop_date,
        fee,
        media,
        min_height,
        max_height,
        min_weight,
        max_weight,
        skin_color,
        hair_type,
        body_type,
        ethnicity,
        agency,
        experience,
        skill,
        status
    }

    const setter = {
        casting_id: setCastingId,
        brief: setBrief,
        thumbnail: setThumbnail,
        max_video: setMaxVideo,
        type: setType,
        production_type: setProductionType,
        other_production_type: setOtherProductionType,
        title: setTitle,
        job_role: setJobRole,
        gender: setGender,
        min_age: setMinAge,
        max_age: setMaxAge,
        description: setDescription,
        due_date_open: setDueDateOpen,
        due_date: setDueDate,
        shooting_date_tbc: setShootingDateTbc,
        shooting_date_start: setShootingDateStart,
        shooting_date_end: setShootingDateEnd,
        location: setLocation,
        wardrobe_date: setWardrobeDate,
        workshop_date: setWorkshopDate,
        fee: setFee,
        media: setMedia,
        min_height: setMinHeight,
        max_height: setMaxHeight,
        min_weight: setMinWeight,
        max_weight: setMaxWeight,
        skin_color: setSkinColor,
        hair_type: setHairType,
        body_type: setBodyType,
        ehtnicity: setEthnicity,
        agency: setAgency,
        experience: setExperience,
        skill: setSkill,
        status: setStatus
    }

    const setCastingCriteria = newCriteria => {
        for (let key in newCriteria) {
            if (
                castingCriteria.hasOwnProperty(key) &&
                typeof setter[key] === 'function'
            ) {
                setter[key](newCriteria[key]);
            } else {
                if (process.env.NODE_ENV === 'development') {
                    console.error(key)
                }
            }
        }
    }

    useEffect(() => {
        const getMaster = [
            http({
                method: 'GET',
                path: 'posting/master/production-type'
            }),
            http({
                method: 'GET',
                path: 'posting/master/job-role'
            }),
            http({
                method: 'GET',
                path: 'profiles/master/body-type'
            }),
            http({
                method: 'GET',
                path: 'profiles/master/ethnicity'
            }),
            http({
                method: 'GET',
                path: 'profiles/master/experience'
            }),
            http({
                method: 'GET',
                path: 'profiles/master/gender'
            }),
            http({
                method: 'GET',
                path: 'profiles/master/hair-type'
            }),
            http({
                method: 'GET',
                path: 'profiles/master/location'
            }),
            http({
                method: 'GET',
                path: 'profiles/master/skin-color'
            })
        ]

        const getCasting = http({
            method: 'GET',
            path: 'posting/casting/' + id
        })

        Promise.all([...getMaster, getCasting])
        .then(results => {
            if (results) {
                let pass = true;

                const setter = [
                    setMasterProductionType,
                    setMasterJobRole,
                    setMasterBodyType,
                    setMasterEthnicity,
                    setMasterExperience,
                    setMasterGender,
                    setMasterHairType,
                    setMasterLocation,
                    setMasterSkinColor
                ]

                if (results[setter.length]) {
                    const newCastingCriteria = {...results[setter.length].payload}

                    if (
                        Array.isArray(results[setter.length].payload.skin_color) &&
                        results[setter.length].payload.skin_color.length > 0
                    ) {
                        newCastingCriteria.skin_color =
                            results[setter.length].payload
                            .skin_color.map(el => el.skin_color)
                    }

                    setCastingCriteria(newCastingCriteria);
                } else {
                    alert.error('failed to fetch casting data, please refresh this page')
                }
                
                setter.forEach((setMaster, index) => {
                    if (results[index] && Array.isArray(results[index].payload)) {
                        setMaster(results[index].payload);

                        if (index === setter.length - 1 && pass) {
                            if (pass) {
                                setCurrentState('idle');
                            } else {
                                alert.error('failed to fetch some master data, please refresh this page');
                            }
                        }
                    } else {
                        if (pass) {
                            pass = false;
                        }
                    }
                });

            } else {
                alert.error('something\'s wrong, please refresh this page')
            }
        })
    }, []);

    const typeToTitle = type => {
        let title;

        switch (type) {
            case 'casting_call':
                title = 'Casting Call';
                break;
            case 'kestingrum':
            default:
                title = 'Kestingrum';
                break;
        }

        return title;
    }
    
    useHeader({
        path: [
            '/casting',
            '/casting/edit'
        ],
        title: [
            'Casting',
            'Edit Casting'
        ]
    });

    const alert = useAlert();

    const masterData = {
        productionType: masterProductionType,
        jobRole: masterJobRole,
        bodyType: masterBodyType,
        ethnicity: masterEthnicity,
        experience: masterExperience,
        gender: masterGender,
        hairType: masterHairType,
        location: masterLocation,
        skinColor: masterSkinColor
    }

    const editCasting = status => {
        const data = {status}

        if (status === 'draft') {
            setCurrentState('saving')
        } else if (status === 'published') {
            setCurrentState('publishing');
        }

        for (let key in castingCriteria) {
            if (
                (
                    Array.isArray(castingCriteria[key]) ||
                    castingCriteria[key] === 0 ||
                    castingCriteria[key] === 1 ||
                    (
                        typeof castingCriteria[key] === 'string' &&
                        castingCriteria[key].length > 0
                    ) ||
                    typeof castingCriteria[key] === 'number' ||
                    typeof castingCriteria[key] === 'object'
                ) && (
                    castingCriteria[key] !== null &&
                    castingCriteria[key] !== undefined
                )
            ) {
                switch (key) {
                    case 'brief':
                        data[key] = castingCriteria[key].map(entry => entry.id);
                        break;
                    case 'thumbnail':
                        data[key] = castingCriteria[key].id
                        break;
                    case 'status':
                        data[key] = status;
                        break;
                    default:
                        data[key] = castingCriteria[key];
                        break;
                }
            }
        }

        http({
            method: 'POST',
            path: 'posting/casting/update/' + casting_id,
            data
        }).then(result => {
            setCurrentState('idle');

            if (result && result.code === 'success') {
                setDone(true);
            } else {
                alert.error(result);
            }
        })
    }

    return (
        <>
            {
                currentState === 'loading'?
                <Loading /> :
                <div className={style.container}>
                    <PageTitle
                        title={['Edit ' + typeToTitle(castingCriteria.type)]}
                        path={['/casting/edit']}
                        returnable={true}
                        backTo={'/casting'}
                    />
                    <CastingForm
                        castingCriteria={castingCriteria}
                        setCastingCriteria={setCastingCriteria}
                        masterData={masterData}
                        disabled={currentState !== 'idle'}
                    />
                    <div className={style.footer}>
                        <div className={style.button_container}>
                            {
                                status === 'draft' ?
                                <>
                                    <BoxButton
                                        className={style.draft_button}
                                        text={
                                            currentState === 'saving' ?
                                            'saving' : 'save as draft'
                                        }
                                        onClick={() => {
                                            editCasting('draft');
                                        }}
                                        disabled={
                                            currentState === 'saving' ||
                                            currentState === 'publishing'
                                        }
                                    />
                                    <BoxButton
                                        className={style.publish_button}
                                        text={
                                            currentState === 'publishing' ?
                                            'publishing' : 'publish'
                                        }
                                        onClick={() => {
                                            editCasting('published');
                                        }}
                                        disabled={
                                            currentState === 'saving' ||
                                            currentState === 'publishing'
                                        }
                                    />
                                </> :
                                <BoxButton
                                    className={style.publish_button}
                                    text={
                                        currentState === 'publishing' ?
                                        'saving' : 'save'
                                    }
                                    onClick={() => {
                                        editCasting('published');
                                    }}
                                    disabled={
                                        currentState === 'saving' ||
                                        currentState === 'publishing'
                                    }
                                />
                            }
                        </div>
                    </div>
                    {done && <Redirect to={'/casting'} />}
                </div>
            }
            <Prompt
                when={isModified}
                message={'You have unsaved changes, are you sure you want to leave this page?'}
            />
        </>
    )
}