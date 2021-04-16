import React, { useState, useEffect } from "react";
import { useAlert } from 'react-alert';

import style from "./FeaturedGroup.module.scss";

import useHeader from '../../../hooks/useHeader/useHeader';
import BoxButton from '../../../components/BoxButton/BoxButton';
import FeaturedGroupContainer from '../../../components/FeaturedGroupContainer/FeaturedGroupContainer';
// import FeaturedGroupPicker from '../../../components/FeaturedGroupPicker/FeaturedGroupPicker';
import FeaturedGroupPicker from '../../../components/FeaturedGroupPicker/FeaturedGroupPicker';
import { http } from '../../../utility/http';
import {Prompt} from 'react-router-dom';

export default function StaffPicks() {
    const [featuredGroup, setFeaturedGroup] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isModified, setIsModified] = useState(undefined);
    const alert = useAlert();

    useHeader({
        title: ['Home Content', 'Featured Group'],
        path: ['/home-content/featured-group', '/home-content/featured-group']
    })

    useEffect(() => {
        getFeaturedGroup();
    }, [])

    useEffect(() => {
        if (isModified === undefined){
            setIsModified(null);
        }
        
        if (isModified === null) {
            setIsModified(false);
        }

        if (isModified === false) {
            setIsModified(true);
        }
    }, [featuredGroup])

    const getFeaturedGroup = () => {
        const params = {
            method: 'GET',
            path: 'posting/group/featured'
        }

        http(params)
        .then(result => {
            if (result && result.code === 'success') {
                setFeaturedGroup(result.payload);
            } else {
                alert.error('fetch data failed!');
            }
        })
    }

    const handleRemove = index => {
        const dup = featuredGroup.slice();
        dup.splice(index, 1);

        setFeaturedGroup(dup);
    }

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const handleAdd = newGroup => {
        const dup = featuredGroup.slice();
        dup.push(...newGroup);

        setFeaturedGroup(dup);
        closeModal();
    }

    const handleSubmit = () => {
        if (!isSaving) {
            const data = {
                ids: featuredGroup.map(group => group.id)
            }

            setIsSaving(true);

            http({
                method: 'POST',
                path: 'posting/group/featured/update',
                data
            })
            .then(result => {
                setIsSaving(false);
                setIsModified(false);
                if (result && result.code === 'success') {
                    alert.success('success');
                } else {
                    alert.error('failed to update featured group');
                }
            })
        }
    }

    return (
        <div className={style.container}>
            <div className={style.staff_pick_outer_wrapper}>
                <div className={style.preview_container}>
                    <div>{'Preview: '}</div>
                </div>
                <div className={style.staff_pick_inner_wrapper}>
                    <FeaturedGroupContainer
                        featuredGroup={featuredGroup}
                        setFeaturedGroup={setFeaturedGroup}
                        openModal={openModal}
                        handleRemove={handleRemove}
                    />
                    <p className={style.note}>{'*Drag picture to set the position'}</p>
                    <BoxButton
                        text={'save changes'}
                        onClick={handleSubmit}
                        disabled={isSaving}
                        className={style.save_button}
                    />
                </div>
            </div>
            {
                modalIsOpen &&
                <FeaturedGroupPicker
                    handleAdd={handleAdd}
                    closeModal={closeModal}
                    featuredGroup={featuredGroup}
                />
            }
            <Prompt
                when={isModified}
                message={'You have unsaved changes, are you sure you want to leave this page?'}
            />
        </div>
    );
}