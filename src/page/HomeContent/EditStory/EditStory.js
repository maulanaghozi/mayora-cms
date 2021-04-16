import React, { useState, useEffect } from 'react'
import useHeader from '../../../hooks/useHeader/useHeader';
import Loading from '../../../components/Loading/Loading';

import { http } from '../../../utility/http';
import CreateStory from '../CreateStory/CreateStory';

import { container, detail } from './EditStory.module.scss';
import { useParams, useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';

export default function EditStory() {
    const [data, setData] = useState(null);
    const {id} = useParams();
    const alert = useAlert();
    const history = useHistory();

    useEffect(() => {
        http({
            method: 'GET',
            path: 'promotion/story/detail/' + id
        })
        .then(result => {
            if (result && result.code === 'success') {
                setData(result.payload);
            } else {
                alert.error('failed to fetch story');
                history.push('/home-content/stories')
            }
        })
    }, [])

    return (
        <>
            {
                data ?
                <CreateStory type={'edit'} data={data} /> :
                <Loading />
            }
        </>
    );
}
