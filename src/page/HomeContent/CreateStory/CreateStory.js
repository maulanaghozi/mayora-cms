import React, { useState, useEffect } from 'react';
import useHeader from '../../../hooks/useHeader/useHeader';

import { http } from '../../../utility/http';

import PageTitle from '../../../components/PageTitle/PageTitle';
import StoryForm from '../../../components/StoryForm/StoryForm';
import StoryUpload from '../../../components/StoryUpload/StoryUpload';

import { container, detail } from './CreateStory.module.scss';
import { Redirect, Prompt } from 'react-router-dom';
import { useAlert } from 'react-alert';

export default function CreateStory(props) {
    const [title, setTitle] = useState(props.data && props.data.title || '');
    const [type, setType] = useState(props.data && props.data.type || null);
    const [plain_description, setPlainDescription] = useState(props.data && props.data.plain_description || '');
    const [raw_description, setRawDescription] = useState(props.data && props.data.raw_description || {});
    const [video_url, setVideoUrl] = useState(props.data && props.data.video_url || '');
    const [isModified, setIsModified] = useState(null);
    const [back, setBack] = useState(false);
   
    const createCriteria = {
        title,
        type,
        plain_description,
        raw_description,
        video_url
    }

    const setter = {
        title: setTitle,
        type: setType,
        plain_description: setPlainDescription,
        raw_description: setRawDescription,
        video_url: setVideoUrl
    }

    const setCreateCriteria = newCriteria => {
        for (let key in newCriteria) {
            if (createCriteria.hasOwnProperty(key)) {
                setter[key](newCriteria[key])
            }
        }
    }

    const alert = useAlert();

    useEffect(() => {
        if (isModified === null) {
            setIsModified(false);
        }

        if (isModified === false) {
            setIsModified(true);
        }
    }, [
        title,
        type,
        plain_description,
        raw_description,
        video_url
    ])

    useHeader({
        title: [
            'Home Content', 'Stories',
            props.type === 'edit' ?
                'Edit Story' :
                'Create New Story'
        ],
        path: [
            '/home-content/stories',
            '/home-content/stories',
            props.type === 'edit' ?
                '/home-content/stories/create/' + props.data.id :
                '/home-content/stories/create'
        ]
    })

    const handleSubmit = status => {
        let params;

        if (props.type === 'edit') {
            params = {
                method: 'POST',
                path: 'promotion/story/' + props.data.id,
                data: {...createCriteria, status}
            }
        } else {
            params = {
                method: 'PUT',
                path: 'promotion/story/create',
                data: {...createCriteria, status}
            }
        }

        http(params)
            .then(result => {
                if (result && result.code === 'success') {
                    setBack(true);
                } else {
                    alert.error(result)
                }
            })
    }

    return (
        <div className={container}>
            <div className={detail}>
                <PageTitle
                    title={[
                        props.type === 'edit' ?
                            'edit story' :
                            'create new story'
                    ]}
                    path={[
                        props.type === 'edit' ?
                            '/home-content/stories/edit/' + props.data.id :
                            '/home-content/stories/create'
                    ]}
                    returnable={true}
                    backTo={'/home-content/stories'}
                />
                <StoryForm story={createCriteria} setStory={setCreateCriteria} />
            </div>
            <StoryUpload
                type={props.type}
                status={props.data ? props.data.status : null}
                story={createCriteria}
                setStory={setCreateCriteria}
                submit={handleSubmit}
            />
            <Prompt
                when={isModified}
                message={'You have unsaved changes, are you sure you want to leave this page?'}
            />
            {
                back &&
                <Redirect to={'/home-content/stories'} />
            }
        </div>
    );
}
