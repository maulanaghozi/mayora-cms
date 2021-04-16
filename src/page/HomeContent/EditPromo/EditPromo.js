import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useHistory, useParams } from 'react-router-dom';
import { container, detail } from './EditPromo.module.scss';

import PageTitle from '../../../components/PageTitle/PageTitle';
import PromoForm from '../../../components/PromoForm/PromoForm';
import PromoUpload from '../../../components/PromoUpload/PromoUpload';
import useHeader from '../../../hooks/useHeader/useHeader';
import CreatePromo from '../CreatePromo/CreatePromo'

import { http } from '../../../utility/http';

export default function EditPromo() {
    const [ready, setReady] = useState(false);
    const [initialData, setInitialData] = useState(null);

    const {id} = useParams();

    const alert = useAlert();

    useEffect(() => {
        http({
            method: 'GET',
            path: `promotion/promo/${id}`
        })
        .then(result => {
            if (result) {
                const payload = result.payload;

                try {
                    const raw = JSON.parse(payload.raw_description);
                    payload.raw_description = raw;
                } catch (err) {
                    alert.error('failed to fetch promo')
                }
                setInitialData(result.payload);
                setReady(true);
            } else {
                alert(result.message);
            }
        })

    }, []);
    return (
        <React.Fragment>
            {
                ready ?
                <CreatePromo
                    type='edit'
                    id={initialData.id}
                    image={initialData.image_url}
                    title={initialData.title}
                    tag={initialData.tag}
                    plain_description={initialData.plain_description}
                    raw_description={initialData.raw_description}
                    status={initialData.status}
                    published_date_start={initialData.published_date_start}
                    published_date_end={initialData.published_date_end}
                /> :
                <span>Loading...</span>
            }
        </React.Fragment>
    );
}