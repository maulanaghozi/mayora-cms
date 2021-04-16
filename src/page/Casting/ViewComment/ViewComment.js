import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import useHeader from '../../../hooks/useHeader/useHeader'

import { ReactComponent as Under_Construction } from '../../../assets/under_construction.svg';
import style from './ViewComment.module.scss';
import PageTitle from '../../../components/PageTitle/PageTitle';
import { useAlert } from 'react-alert';
import { http } from '../../../utility/http';
import Loading from '../../../components/Loading/Loading';
import CommentViewer from '../../../components/CommentViewer/CommentViewer';

function ViewComment(props) {
    useHeader({
        path: ['/casting', `/casting/detail/${props.casting.casting_id}`, `/casting/view-comment/${props.casting.casting_id}`],
        title: ['Casting', props.casting.title, 'View Comment']
    })
    return (
        <CommentViewer casting={props.casting} comment={props.comment} />
    )
}

export default () => {
    const [casting, setCasting] = useState(null);
    const [comment, setComment] = useState(null);
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

        http({
            method: 'GET',
            path: 'posting/comment/' + id,
            query: {
                page: 1,
                rows: 20,
            }
        }).then(result => {
            if (result && result.code === 'success') {
                setComment(result.payload);
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
                (casting && comment) ?
                <ViewComment
                    casting={casting}
                    comment={comment}
                /> :
                <div className={style.loading_container}>
                    <Loading />
                </div>
            }
        </div>
    )
}