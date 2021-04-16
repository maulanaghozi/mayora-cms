import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import style from './CastingAssets.module.scss';

import BriefViewer from '../BriefViewer/BriefViewer';
import InputSelect from '../InputSelect/InputSelect';

import { ReactComponent as ApplicantIcon } from '../../assets/casting/View/user_star_line.svg';
import { ReactComponent as LikeIcon } from '../../assets/casting/View/thumbs_up.svg';
import { ReactComponent as CommentIcon } from '../../assets/casting/View/message_square.svg';
import { http } from '../../utility/http';
import { useAlert } from 'react-alert';

let startRequest;

export default function CastingAssets(props) {
    const {
        thumbnail
    } = props.data;

    return (
        <div className={style.container}>
            <div className={style.topInfo}>
                <ApplicantCount data={props.data} />
                <CommentCount data={props.data} />
                <LikeCount data={props.data} />
            </div>
            <div className={style.thumbnail}>
                <div>{'Thumbnail: '}</div>
                {
                    thumbnail ?
                    <img
                        // <TODO>
                        // add fallback image url for thumbnail
                        src={thumbnail ? thumbnail.thumbnail_url : ''}
                        alt={'casting thumbnail image'}
                    /> : 'Thumbnail is not uploaded yet'
                }
            </div>
            <div className={style.brief}>
                <div className={style.text}>{'Brief: '}</div>
                <div className={style.brief_container}>
                    <BriefViewer
                        url={props.data.brief.map(brief => brief.brief_url)}
                    />
                </div>
            </div>
            {
                props.data.max_video &&
                <MaxVideoSelect data={props.data} />
            }
        </div>
    )
}

const ApplicantCount = props => {
    return (
        <div className={classNames(
            style.card,
            style.applicant
        )}>
            <ApplicantIcon />
            <div className={style.info}>
                <p className={style.title}>{'APPLICANT'}</p>
                {
                    props.data.status === 'published' ?
                    <Link
                        to={{
                            pathname: `/casting/view-applicant/${props.data.casting_id}`,
                            state: {
                                from: `/casting/detail/${props.data.casting_id}`
                            }
                        }}
                        className={style.value}
                    >
                        {props.data.totalApplicant || 0}
                    </Link> : 
                    <span className={style.value}>0</span>
                }
            </div>
        </div>
    )
}

const CommentCount = props => {
    return (
        <div className={style.card}>
            <CommentIcon />
            <div className={style.info}>
                <p className={style.title}>{'COMMENT'}</p>
                {
                    props.data.status === 'published' ?
                    <Link
                        to={`/casting/${props.datacasting_id}/view/comment`}
                        className={style.value}
                    >
                        {props.data.total_comment || 0}
                    </Link> :
                    <span className={style.value}>0</span>
                }
            </div>
        </div>
    )
}

const LikeCount = props => {
    return (
        <div className={style.card}>
            <LikeIcon />
            <div className={style.info}>
                <p className={style.title}>{'LIKE'}</p>
                {
                    props.data.status === 'published' ?
                    <Link
                        to={`/casting/${props.data.casting_id}/view/like`}
                        className={style.value}
                    >
                        {props.data.total_like || 0}
                    </Link> :
                    <span className={style.value}>0</span>
                }
            </div>
        </div>
    )
}

const MaxVideoSelect = props => {
    const [
        maxVideoIsLoading,
        setMaxVideoIsLoading
    ] = useState(false);

    const alert = useAlert();
    
    return (
        <div className={style.footer}>
            <div>
                <p>Max Casting Video :</p>
                <p className={style.note}>*untuk talent</p>
            </div>
            <InputSelect
                className={classNames(
                    style.max_video
                )}
                defaultValue={{
                    value: props.data.max_video,
                    label: props.data.max_video + ''
                }}
                options={[
                    {
                        value: 1,
                        label: '1'
                    },
                    {
                        value: 2,
                        label: '2'
                    },
                    {
                        value: 3,
                        label: '3'
                    },
                    {
                        value: 4,
                        label: '4'
                    },
                    {
                        value: 5,
                        label: '5'
                    },
                ]}
                onChange={selected => {
                    startRequest = performance.now();
                    setMaxVideoIsLoading(true);

                    http({
                        method: 'POST',
                        path: `posting/casting/update/${props.data.casting_id}`,
                        data: {
                            max_video: selected.value
                        }
                    }).then(result => {
                        if (performance.now() - startRequest > 500)  {
                            setMaxVideoIsLoading(false);
                        } else {
                            setTimeout(() => {
                                setMaxVideoIsLoading(false);
                            }, 200);
                        }

                        if (!result || result.code !== 'success') {
                            alert.error('failed to update casting max video');
                        }
                    })
                }}
                reverse={true}
                isLoading={maxVideoIsLoading}
                isDisabled={maxVideoIsLoading}
            />
        </div>
    )
}