import React, { useState, useEffect } from 'react';
import style from './ApplicantViewer.module.scss';
import PageCounter from '../PageCounter/PageCounter';
import PageSelector from '../PageSelector/PageSelector';
import CountSelector from '../CountSelector/CountSelector';
import InputSelect from '../InputSelect/InputSelect';
import classNames from 'classnames';
import { arrayToOptions, capitalize } from '../../utility/utility';
import { http } from '../../utility/http';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import moment from 'moment';
import {DownloadIcon, CheckBoxChecked} from '../../assets/image';
import ContentViewer from '../ContentViewer';
import CheckWithTooltip from '../CheckWIthTooltip/CheckWithTooltip';

const defaultOptions = [
    {
        value: 'pending',
        label: 'Pending'
    },
    {
        value: 'rejected',
        label: 'Reject'
    },
    {
        value: 'shortlist',
        label: 'Shortlist'
    },
    {
        value: 'cast',
        label: 'Cast'
    }
]

const optionsHash = {
    pending: 0,
    rejected: 1,
    shortlist: 2,
    cast: 3
}

const createAction = currentStatus => {
    const options = defaultOptions.slice();
    const index = optionsHash[currentStatus];

    options.splice(index, 1);

    return options;
}

export default function ApplicantViewer(props) {
    const [selected, setSelected] = useState({});
    const [actionIsLoading, setActionIsLoading] = useState(false);
    const [logMessage, setLogMessage] = useState('');
    const [selectedCount, setSelectedCount] = useState(0);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
    const [currentVideoOwnerId, setCurrentVideoOwnerId] = useState(null);

    const {id} = useParams();
    const alert = useAlert();

    const emptyLog = () => {
        setLogMessage('');
    }

    useEffect(() => {
        let count = 0;

        for(let key in selected) {
            if (selected[key]) {
                count++
            }
        }
        setSelectedCount(count)
    }, [selected])

    useEffect(() => {
        document.addEventListener('click', emptyLog);
        return () => {
            document.removeEventListener('click', emptyLog);
        }
    }, []);

    return (
        <div className={style.container}>
            <div className={style.header}>
                <ApplicantCount
                    count={props.data && props.data.total_rows || 0}
                    suffix='Aplikan'
                />
                <ActionLog
                    log={logMessage}
                />
                <div className={style.action_container}>
                    <InputSelect
                        className={style.action_with_margin}
                        defaultValue={{
                            value: null,
                            label: 'Pilih Action'
                        }}
                        placeholder={'Pilih Action'}
                        options={[
                            ...createAction(
                                props.searchCriteria
                                .applicant_status
                            )
                        ]}
                        onChange={ inputValue => {
                            setActionIsLoading(true);
                            const user_ids = [];

                            for (let key in selected) {
                                if (selected[key]) {
                                    user_ids.push(key);
                                }
                            }
                            http({
                                method: 'POST',
                                path: 'posting/applicant/update',
                                data: {
                                    casting_id: id,
                                    user_ids,
                                    status: inputValue.value
                                }
                            })
                            .then(result => {
                                setActionIsLoading(false);
                                
                                if (result && result.code === 'success') {
                                    setLogMessage(
                                        'Status ' + user_ids.length +
                                        ' aplikan telah diubah menjadi ' +
                                        inputValue.value
                                    );
                                    setSelected({});
                                    props.setSearchCriteria({sessionId: 0})
                                } else {
                                    alert.error('failed to update applicant status')
                                }
                            })
                        }}
                        selected={selectedCount}
                        isLoading={actionIsLoading}
                        isDisabled={
                            actionIsLoading ||
                            Object.keys(selected).length === 0
                        }
                    />
                    <div className={style.select_container}>
                        <span>{'Sort by:'}</span>
                        <InputSelect
                            className={style.action}
                            defaultValue={{
                                value: {
                                    sortBy: 'updated_at',
                                    order: 'DESC'
                                },
                                label: 'Terbaru'
                            }}
                            placeholder={'Urutkan...'}
                            options={[
                                {
                                    value: {
                                        sortBy: 'updated_at',
                                        order: 'DESC'
                                    },
                                    label: 'Terbaru'
                                },
                                {
                                    value: {
                                        sortBy: 'updated_at',
                                        order: 'ASC'
                                    },
                                    label: 'Terlama'
                                },
                                {
                                    value: {
                                        sortBy: 'name',
                                        order: 'ASC'
                                    },
                                    label: 'Nama A-Z'
                                },
                                {
                                    value: {
                                        sortBy: 'name',
                                        order: 'DESC'
                                    },
                                    label: 'Nama Z-A'
                                }
                            ]}
                            onChange={ selected => {
                                props.setSearchCriteria(
                                    {
                                        sortBy: selected.value.sortBy,
                                        order: selected.value.order
                                    }
                                )
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={style.applicants}>
                {
                    props.data && 
                    Array.isArray(props.data.rows) &&
                    props.data.rows.map((applicant, index) => (
                        <ApplicantCard
                            key={applicant.user_id}       
                            data={applicant}
                            selected={selected}
                            setSelected={setSelected}
                            casting={props.casting}
                            searchCriteria={props.searchCriteria}
                            setSearchCriteria={props.setSearchCriteria}
                            setLogMessage={setLogMessage}
                            currentVideoIndex={currentVideoIndex}
                            setCurrentVideoIndex={setCurrentVideoIndex}
                            currentVideoOwnerId={currentVideoOwnerId}
                            setCurrentVideoOwnerId={setCurrentVideoOwnerId}
                        />
                    ))
                }
            </div>
            <div className={style.footer}>
                <div className={style.page_counter_container}>
                    <CountSelector
                        setRow={rows => {
                            props.setSearchCriteria(
                                {rows}
                            )
                        }}
                    />
                    <PageCounter
                        className={style.page_counter}
                        searchCriteria={props.searchCriteria}
                        result={props.data}
                    />
                </div>
                <PageSelector
                    result={props.data}
                    setPage={page => {
                        props.setSearchCriteria(
                            {page}
                        )
                    }}
                />
            </div>
        </div>
    )
}

const ApplicantCard = props => {
    const [checked, setChecked] = useState(false);
    const [actionIsLoading, setActionIsLoading] = useState(false);

    const alert = useAlert();

    const onCheck = () => {
        setChecked(!checked);
        props.setSelected({...props.selected, [props.data.user_id]: !checked});
    }

    const renderGenderAndAge = () => {
        let output = '';

        if (props.data && props.data.gender) {
            output += props.data.gender;
        } else {
            output += '-'
        }

        output += ' / ';

        if (props.data && props.data.dob) {
            output += moment().diff(props.data.dob, 'years') + ' tahun';
        } else {
            output += '-'
        }
        
        return (
            <>
                <span>{output}</span>
                <CheckWithTooltip
                    className={style.tooltip}
                    name={['gender', 'umur']}
                    value={{
                        gender: props.data.gender,
                        age: parseInt(
                                moment().diff(
                                    moment(props.data.dob),
                                    'years'
                                )
                            )
                    }}
                    comparator={{
                        gender: props.casting.gender,
                        min_age: props.casting.min_age,
                        max_age: props.casting.max_age
                    }}
                    comparison={(value, comparator) => {
                        let genderMatch = false;
                        let ageMatch = false;

                        if (Array.isArray(comparator)) {
                            for (let i = 0; i < comparator.length; i++) {
                                if (comparator[i] === value) {
                                    genderMatch = true;
                                    break;
                                }
                            }
                        }

                        if (
                            comparator.min_age &&
                            comparator.max_age &&
                            value.age >= comparator.min_age &&
                            value.age <= comparator.max_age
                        ) {
                            ageMatch = true;
                        }

                        return [genderMatch, ageMatch];
                    }}
                />
            </>
        )
    }

    const renderHeightAndWeight = () => {
        let output = '';

        if (props.data && props.data.height) {
            output += props.data.height + ' cm'
        } else {
            output += '-'
        }

        output += ' / ';

        if (props.data && props.data.weight) {
            output += props.data.weight + ' kg';
        } else {
            output += '-'
        }
        
        return (
            <>
                <span>{output}</span>
                <CheckWithTooltip
                    className={style.tooltip}
                    name={['tinggi', 'berat']}
                    value={{
                        height: props.data.height,
                        weight: props.data.weight
                    }}
                    comparator={{
                        min_height: props.casting.min_height,
                        max_height: props.casting.max_height,
                        min_weight: props.casting.min_weight,
                        max_weight: props.casting.max_weight
                    }}
                    comparison={(value, comparator) => {
                        let heightMatch = false;
                        let weightMatch = false;

                        if (
                            comparator.min_height &&
                            comparator.max_height &&
                            value.height >= comparator.min_height &&
                            value.height <= comparator.max_height
                        ) {
                            heightMatch = true;
                        }

                        if (
                            comparator.min_weight &&
                            comparator.max_weight &&
                            value.weight >= comparator.min_weight &&
                            value.weight <= comparator.max_weight
                        ) {
                            weightMatch = true;
                        }

                        return [heightMatch, weightMatch];
                    }}
                />
            </>
        )
    }

    const renderHairType = () => {
        let output = '';

        if (props.data && props.data.hair_type) {
            output += props.data.hair_type;
        } else {
            output += '-';
        }

        return (
            <>
                <span>{output}</span>
                <CheckWithTooltip
                    className={style.tooltip}
                    name={'Jenis rambut'}
                    value={props.data.hair_type}
                    comparator={props.casting.hair_type}
                    comparison={(value, comparator) => {
                        if (Array.isArray(comparator)) {
                            let match = false;

                            for (let i = 0; i < comparator.length; i++) {
                                if (comparator[i] === value) {
                                    match = true;
                                    break;
                                }
                            }

                            return match
                        }
                    }}
                />
            </>
        )
    }

    const renderEthnicity = () => {
        let output = '';

        if (props.data && props.data.ethnicity) {
            output += props.data.ethnicity;
        } else {
            output += '-';
        }

        return (
            <>
                <span>{output}</span>
                <CheckWithTooltip
                    className={style.tooltip}
                    name={'Jenis rambut'}
                    value={props.data.ethnicity}
                    comparator={props.casting.ethnicity}
                    comparison={(value, comparator) => {
                        if (Array.isArray(comparator)) {
                            let match = false;

                            for (let i = 0; i < comparator.length; i++) {
                                if (comparator[i] === value) {
                                    match = true;
                                    break;
                                }
                            }

                            return match
                        }
                    }}
                />
            </>
        )
    }

    const renderSkinColor = () => {
        if (
            props.data &&
            props.data.skin_color &&
            props.data.skin_color.skin_color &&
            props.data.skin_color.hex_color
        ) {
            return (
                <>
                    <div
                        className={style.skin_hex_color}
                        style={{
                            backgroundColor: props.data.skin_color.hex_color
                        }}
                    />
                    <div>
                        {
                            props.data.skin_color.skin_color
                        }
                    </div>
                    <CheckWithTooltip
                    className={style.tooltip}
                    name={'Warna kulit'}
                    value={props.data.skin_color.skin_color}
                    comparator={props.casting.skin_color}
                    comparison={(value, comparator) => {
                        if (Array.isArray(comparator)) {
                            let match = false;

                            for (let i = 0; i < comparator.length; i++) {
                                if (comparator[i].skin_color === value) {
                                    match = true;
                                    break;
                                }
                            }

                            return match;
                        }
                    }}
                />
                </>
            )
        } else {
            return '-'
        }
    }

    return (
        <div className={style.card}>
            <div className={style.picture_container}>
                <div
                    className={style.profile_picture}
                    style={{
                        backgroundImage:
                            "url(" + (
                                (
                                    props.data &&
                                    props.data.profile_pic_url
                                ) ||
                                'fallback_url'
                            ) + ")"
                    }}
                >
                    <div
                        className={style.checkbox_container}
                        onClick={onCheck}
                    >
                        <div className={style.checkbox}>
                            {checked && <CheckBoxChecked />}
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.data_container}>
                <div className={style.properties}>
                    <div className={style.name_container}>
                        <div className={style.name}>
                            {
                                (
                                    props.data &&
                                    props.data.name
                                ) || '-'
                            }
                        </div>
                        <div className={style.username}>
                            {(props.data && props.data.username) || '-'}
                        </div>
                        <div className={style.location} title={'Lokasi'}>
                            {(props.data && props.data.location) || '-'}
                            <CheckWithTooltip
                                className={style.tooltip}
                                name={'lokasi'}
                                value={props.data.location}
                                comparator={props.casting.location}
                                comparison={(value, comparator) => {
                                    if (Array.isArray(comparator)) {
                                        let match = false;

                                        for (let i = 0; i < comparator.length; i++) {
                                            if (comparator[i] === value) {
                                                match = true;
                                                break;
                                            }
                                        }

                                        return match
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.biodata_container}>
                        <div
                            className={style.list}
                            title={'Gender dan umur'}
                        >
                            {renderGenderAndAge()}
                        </div>
                        <div
                            className={style.list}
                            title={'Tinggi dan berat badan'}
                        >
                            {renderHeightAndWeight()}
                        </div>
                        <div
                            className={style.list}
                            title={'Jenis rambut'}
                        >
                            {renderHairType()}
                        </div>
                        <div
                            className={style.list}
                            title={'Etnis/suku'}
                        >
                            {renderEthnicity()}
                        </div>
                        <div
                            className={style.list}
                            title={'Warna kulit'}
                        >
                            {renderSkinColor()}
                        </div>
                    </div>
                    <div className={style.application_date_container}>
                        <div className={style.sub_title}>
                            <div>
                                {'TANGGAL'}
                            </div>
                            <div>
                                {'DAFTAR'}
                            </div>
                        </div>
                        <div className={style.application_date}>
                            {
                                moment.unix(props.data.application_date)
                                .format('DD MMM YYYY')
                            }
                        </div>
                        <div className={style.application_date}>
                            {moment.unix(props.data.application_date)
                            .format('HH:mm:ss')}
                        </div>
                    </div>
                    <div>
                        <div className={style.sub_title}>{'ACTIONS'}</div>
                        <InputSelect
                            className={style.sub_action}
                            defaultValue={{
                                value: null,
                                label: 'Pilih Action'
                            }}
                            placeholder={'Pilih Action'}
                            options={[
                                ...createAction(
                                    props.searchCriteria
                                    .applicant_status
                                )
                            ]}
                            onChange={ inputValue => {
                                setActionIsLoading(true);
                                http({
                                    method: 'POST',
                                    path: 'posting/applicant/update',
                                    data: {
                                        casting_id: props.casting.casting_id,
                                        user_ids: [props.data.user_id],
                                        status: inputValue.value
                                    }
                                })
                                .then(result => {
                                    setActionIsLoading(false);
                                    props.setLogMessage(
                                        'Status 1 aplikan telah diubah menjadi ' +
                                        inputValue.value
                                    );

                                    if (result && result.code === 'success') {
                                        props.setSearchCriteria({sessionId: 0})
                                    } else {
                                        alert.error('failed to update applicant status')
                                    }
                                })
                            }}
                            isLoading={actionIsLoading}
                            isDisabled={actionIsLoading}
                        />
                    </div>
                    <div className={style.application_status_container}>
                        <div className={style[props.data.application_status]}>
                            <span>{props.data.application_status.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
                <div className={style.audition_video_outer_container}>
                    <div className={style.audition_video_inner_container}>
                        {
                            props.data.audition_video.map((video, index) => (
                                <React.Fragment key={video.id}>
                                    <AuditionVideo
                                        key={video.id}
                                        data={video}
                                        onClick={() => {
                                            props.setCurrentVideoOwnerId(props.data.user_id);
                                            props.setCurrentVideoIndex(index);
                                        }}
                                        downloadURL={''}
                                    />
                                    {
                                        typeof props.currentVideoIndex === 'number' &&
                                        (props.currentVideoIndex + 1) &&
                                        (props.currentVideoOwnerId === props.data.user_id) &&
                                        <ContentViewer
                                            key={props.data.user_id}
                                            content={
                                                props.data.audition_video
                                                .map(video => video.video_url)
                                            }
                                            localContent={[]}
                                            index={props.currentVideoIndex}
                                            setShow={() => {
                                                props.setCurrentVideoIndex(null);
                                                props.setCurrentVideoOwnerId(null);
                                            }}
                                        />
                                    }
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div> 
            </div>
        </div>
    )
}

const AuditionVideo = props => {
    return (
        <div className={style.audition_video_container}>
            <div className={style.video_container} onClick={props.onClick}>
                <video
                    src={props.data.video_url + '#t=0.5'}
                    className={style.video}
                />
                <div className={style.play_button} />
            </div>
            <div className={style.video_title_container}>
                <div className={style.video_title}>{props.data.title}</div>
                <a href={props.data.video_url}>
                    <DownloadIcon
                        height={18}
                        width={18}
                    />
                </a>
            </div>
        </div>
    )
}

const ActionLog = props => {
    return (
        <div className={style.log_message}>{props.log && ('*' + props.log)}</div>
    )
}

const ApplicantCount = props => {
    return (
        <div className={style.count}>
            {props.count + ' ' + props.suffix}
        </div>
    )
}