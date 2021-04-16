import React, { useState, useEffect } from 'react';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { useAlert } from "react-alert";

import { http } from '../../../utility/http';

import useHeader from '../../../hooks/useHeader/useHeader';

import SettingsContainer from '../../../components/Settings/SettingsContainer/SettingsContainer';
import SettingsFooter from '../../../components/Settings/SettingsFooter/SettingsFooter';
import PreviewLandingPages from '../../../components/Settings/PreviewLandingPages/PreviewLandingPages';
import Card from '../../../components/Settings/LandingPageEditor/Card';

export default function LandingPage() {
    const [landingPages, setLandingPages] = useState([]);
    const [inPreview, setInPreview] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const alert = useAlert();

    useHeader({
        path: ['/settings', '/settings/landing-page'],
        title: ['Settings', 'Landing Page']
    })

    useEffect(() => {
        fetchLandingPage();
    }, [])

    const fetchLandingPage = () => {
        http(
            {
                method: 'GET',
                path: 'promotion/landing-page'
            }
        )
        .then(result => {
            if (result && result.code === 'success') {
                setLandingPages(result.payload);
            } else {
                setLandingPages([
                    {
                        id: 'create',
                        image_url: 'https://via.placeholder.com/131x210?text=KESTINGRUM',
                        catch_phrase: ''
                    }
                ])
            }
        })
    }

    const save = () => {
        const updateOrCreateLandingPages = landingPages.map((landingPage, index) => {
            const data = new FormData();

            data.append('catch_phrase', landingPage.catch_phrase);
            data.append('order', index + 1);

            if (landingPage.file instanceof File) {
                data.append('image', landingPage.file);
            }

            setIsLoading(true);

            if (landingPage.id.length === 30) {
                return http({
                    method: 'POST',
                    path: 'promotion/landing-page/' + landingPage.id,
                    data: data
                })
            } else {
                return http({
                    method: 'PUT',
                    path: 'promotion/landing-page/create',
                    data: data
                })
            }
        })

        Promise.all(updateOrCreateLandingPages)
        .then(results => {
            if(!results) {
                alert.error('upload failed!');
            } else {
                fetchLandingPage();
            }
            setIsLoading(false);
        })
    }

    const moveCard = (dragIndex, hoverIndex) => {
        const dragCard = landingPages[dragIndex]
        setLandingPages(
            update(landingPages, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }),
        )
    }

    return (
        <DndProvider backend={Backend}>
            <SettingsContainer title={['Settings', 'Privacy Policy']} path={['/settings', '/settings/privacy-policy']}>
                {
                    landingPages.map((el, index, arr) => {
                        return (
                            <Card
                                key={el.id}
                                landingPage={el}
                                landingPages={arr}
                                index={index}
                                setLandingPages={setLandingPages}
                                moveCard={moveCard}
                            />
                        )
                    })
                }
                <SettingsFooter
                    landingPages={landingPages}
                    setLandingPages={setLandingPages}
                    setInPreview={setInPreview}
                    save={save}
                    isLoading={isLoading}
                />
            </SettingsContainer>
            {inPreview && <PreviewLandingPages setInPreview={setInPreview} landingPages={landingPages} />}
		</DndProvider>
    )
}