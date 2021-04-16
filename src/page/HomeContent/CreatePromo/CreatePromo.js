import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { Prompt, Redirect } from 'react-router-dom';
import { container, detail } from './CreatePromo.module.scss';

import PageTitle from '../../../components/PageTitle/PageTitle';
import PromoForm from '../../../components/PromoForm/PromoForm';
import PromoUpload from '../../../components/PromoUpload/PromoUpload';
import useHeader from '../../../hooks/useHeader/useHeader';

import { http } from '../../../utility/http';

export default function PromoCreate(props) {
    const [image, setImage] = useState(props.image || null);
    const [title, setTitle] = useState(props.title || '');
    const [tag, setTag] = useState(props.tag || []);
    const [plain_description, setPlainDescription] = useState(props.plain_description || '');
    const [raw_description, setRawDescription] = useState(props.raw_description || '');
    const [status, setStatus] = useState(props.status || null);
    const [published_date_start, setPublishedDateStart] = useState(props.published_date_start || null);
    const [published_date_end, setPublishedDateEnd] = useState(props.published_date_end || null);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isModified, setIsModified] = useState(props.status ? null : undefined);
    const [back, setBack] = useState(false);
    const alert = useAlert();

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
        image,
        title,
        tag,
        plain_description,
        raw_description,
        status,
        published_date_start,
        published_date_end
    ])

    const promo = {
        image,
        title,
        tag,
        plain_description,
        raw_description,
        status,
        published_date_start,
        published_date_end
    }

    const setter = {
        image: setImage,
        title: setTitle,
        tag: setTag,
        plain_description: setPlainDescription,
        raw_description: setRawDescription,
        status: setStatus,
        published_date_start: setPublishedDateStart,
        published_date_end: setPublishedDateEnd
    }

    const setPromo = newData => {
        for (let key in newData) {
            if (promo.hasOwnProperty(key)) {
                setter[key](newData[key]);
            }
        }
    }

    useHeader({
        title: [
            'Home Content',
            'Promo',
            props.type === 'edit' ?
                'Edit Promo' :
                'Create New Promo'
        ],
        path: [
            '/home-content',
            '/home-content/promo',
            props.type === 'edit' ?
                '/home-content/promo/edit/' + props.id :
                '/home-content/promo/create'
        ]
    })

    const handleImageChange = value => {
        setPromo({
            image: value
        });
    }

    const createPromo = ({active}) => {
        const data = new FormData();

        if (promo.image instanceof Blob) {
            data.append('image', promo.image, 'promo.jpeg');
        }

        if (typeof promo.title === 'string') {
            data.append('title', promo.title);
        }

        if (Array.isArray(promo.tag)) {
            promo.tag.forEach(entry => {
                data.append('tag[]', entry);
            });
        }

        if (promo.plain_description) {
            data.append('plain_description', promo.plain_description);

            if (typeof promo.raw_description === 'object') {
                data.append('raw_description', JSON.stringify(promo.raw_description));
            } else {
                data.append('raw_description', promo.raw_description);
            }
        }

        if (promo.published_date_start) {
            data.append('published_date_start', promo.published_date_start);
        }

        if (promo.published_date_end) {
            data.append('published_date_end', promo.published_date_end);
        }

        data.append('status', active ? 'published' : 'draft');

        const params = {
            method: 'PUT',
            path: 'promotion/promo/create',
            data: data
        }

        http(params)
        .then(result => {
            active ? setIsPublishing(false) : setIsSaving(false);
            
            if (result && result.code === 'success') {
                alert.success(result.message);
                setIsModified(false);
                setBack(true);
            } else {
                alert.error(result);
            }
        });
    }

    const editPromo = ({active}) => {
        const data = new FormData();

        if (promo.image instanceof Blob) {
            data.append('image', promo.image, 'promo.jpeg');
        }
        
        data.append('title', promo.title);
        promo.tag.forEach(entry => {
            data.append('tag[]', entry);
        });
        data.append('plain_description', promo.plain_description);
        if (typeof promo.raw_description === 'object') {
            data.append('raw_description', JSON.stringify(promo.raw_description));
        } else {
            data.append('raw_description', promo.raw_description);
        }

        if (active === 1) {
            data.append('status', 'published');
        }

        if (promo.published_date_start) {
            data.append('published_date_start', promo.published_date_start);
        }

        if (promo.published_date_end) {
            data.append('published_date_end', promo.published_date_end);
        }

        const params = {
            method: 'POST',
            path: `promotion/promo/${props.id}`,
            data: data
        }

        http(params)
        .then(result => {
            active ? setIsPublishing(false) : setIsSaving(false);
            
            if (result && result.code === 'success') {
                alert.success(result.message);
                setIsModified(false);
                setBack(true);
            } else {
                alert.error(result);
            }
        });
    }

    const save = () => {
        setIsSaving(true);

        if (props.type === 'edit') {
            editPromo({});
        } else {
            createPromo({active: 0});
        }
    }

    const publish = () => {
        setIsPublishing(true);

        if (props.type === 'edit') {
            editPromo({active: 1});
        } else {
            createPromo({active: 1});
        }
    }

    return (
        <div className={container}>
            <div className={detail}>
                <PageTitle
                    title={[
                        props.type === 'edit' ?
                            'edit promo' :
                            'create new promo'
                    ]}
                    path={[
                        props.type === 'edit' ?
                            '/home-content/promo/edit/' + props.id :
                            '/home-content/promo/create'
                    ]}
                    returnable={true}
                    backTo={'/home-content/promo'}
                />
                <PromoForm
                    promo={promo}
                    setPromo={setPromo}
                />
            </div>
            <PromoUpload
                publish={publish}
                save={save}
                onImageChange={handleImageChange}
                isPublishing={isPublishing}
                isSaving={isSaving}
                initialImage={promo.image}
                active={promo.status === 'active' || promo.status === 'inactive' || promo.status === 'published'}
            />
            <Prompt
                when={isModified}
                message={'You have unsaved changes, are you sure you want to leave this page?'}
            />
            {
                back &&
                <Redirect to={'/home-content/promo'} />
            }
        </div>
    );
}