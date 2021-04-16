import React, { useState, useEffect } from 'react';
import style from './CastingForm.module.scss';
import SegmentTitle from './SegmentTitle';
import BriefUploader from './BriefUploader';
import ThumbnailUploader from './ThumbnailUploader';
import InputSelect from '../InputSelect/InputSelect';

import {
    BlueDiamondOne,
    BlueCircleQuestionMark,
} from '../../assets/image';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ContentViewer from '../ContentViewer';


const fadeTransition = {
    enter: style.fade_enter,
    enterActive: style.fade_enter_active,
    exit: style.fade_exit,
    exitActive: style.fade_exit_active,
    appear: style.fade_enter,
    appear_active: style.fade_enter_active
}

export default props => {
    const [
        currentBrief,
        setCurrentBrief
    ] = useState(props.castingCriteria.brief || []);
    const [
        currentThumbnail,
        setcCurrentThumbnail
    ] = useState(props.castingCriteria.thumbnail || null);
    const [
        maxVideo,
        setMaxVideo
    ] = useState(props.castingCriteria.max_video || 1);

    const [localBrief, setLocalBrief] = useState([]);
    const [uploaderIds, setUploaderIds] = useState([]);
    const [contentView, setContentView] = useState(false);

    useEffect(() => {
        if (props.castingCriteria.casting_id) {
            setCurrentBrief(props.castingCriteria.brief);

            generateUploader(props.castingCriteria.brief.length + 1);
        } else {
            generateUploader()
        }
    }, []);

    useEffect(() => {
        const newCastingCriteria = {}

        if (Array.isArray(currentBrief)) {
            newCastingCriteria.brief = currentBrief;
        }

        if (currentThumbnail) {
            newCastingCriteria.thumbnail = currentThumbnail
        }

        if (maxVideo) {
            newCastingCriteria.max_video = maxVideo; 
        }

        props.setCastingCriteria(newCastingCriteria);
    }, [currentBrief, currentThumbnail, maxVideo])

    const generateUploader = (num = 1) => {
        const newIds = [];
        let dupIds = uploaderIds.slice();
        
        for (let i = 0; i < num; i++) {
            const id = Math.round(Math.random() * 1000);

            dupIds.push(id);
            newIds.push(id);
        }

        setUploaderIds(dupIds);

        if (num === 1) {
            return newIds[0];
        } else {
            return newIds;
        }
    }

    return (
        <div>
            <SegmentTitle
                title={'Upload Brief'}
                Icon={BlueDiamondOne}
            />
            <div>
                <TransitionGroup className={style.brief_uploader_container}>
                    {uploaderIds && uploaderIds.map((id, index) => {
                        return (
                            <CSSTransition
                                key={id}
                                timeout={200}
                                classNames={fadeTransition}
                            >
                                <BriefUploader
                                    brief={currentBrief[index]}
                                    index={index}
                                    totalUploader={uploaderIds.length}
                                    totalBrief={currentBrief.length}
                                    updateBrief={(newBrief, newLocal) => {
                                        let dupBrief = currentBrief.slice();
                                        let dupLocal = localBrief.slice();

                                        if (newBrief) {
                                            dupBrief.splice(index, 1, newBrief);
                                        } else {
                                            dupBrief.splice(index, 1);
                                        }

                                        if (newLocal) {
                                            dupLocal.splice(index, 1, newLocal);
                                        } else {
                                            dupLocal.splice(index, 1);
                                        }

                                        setCurrentBrief(dupBrief);
                                        setLocalBrief(dupLocal);
                                    }}
                                    generateUploader={generateUploader}
                                    removeUploader={newUploader => {
                                        let dupIds = uploaderIds.slice();
                                        
                                        if (newUploader) {
                                            dupIds.splice(index, 1, newUploader);
                                        } else {
                                            dupIds.splice(index, 1);
                                        }
                                        
                                        setUploaderIds(dupIds);
                                    }}
                                    uploaderIds={uploaderIds}
                                    contentView={contentView}
                                    setContentView={setContentView}
                                />
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>
                {
                    !!contentView &&
                    <ContentViewer
                        content={currentBrief.map(brief => brief.brief_url)}
                        localContent={localBrief}
                        setShow={setContentView}
                        index={contentView - 1}
                    />
                }
                <p className={style.footer_text}>
                    {
                        '*maksimal video / foto tutorial brief yang dapat ' +
                        'diupload 5 file. (*MP4, *JPG, *JPEG, *PNG)'
                    }
                </p>
            </div>
            <div className={style.thumbnail_uploader_container}>
                <div className={style.thumbnail_text}>
                    {'Thumbnail: '}
                </div>
                <div className={style.thumbnail_uploader_wrapper}>
                    <ThumbnailUploader
                        updateThumbnail={newThumbnail => {
                            setcCurrentThumbnail(newThumbnail);
                        }}
                        thumbnail={props.castingCriteria.thumbnail}
                    />
                    <p className={style.footer_text}>
                        {'*ekstensi file yang diperbolehkan : .JPG, .JPEG, .PNG'}
                    </p>
                </div>
                <div className={style.max_video_wrapper}>
                    <div className={style.max_video_text}>
                        <div className={style.title}>
                            {'Max Video Audisi'}
                        </div>
                        <div className={style.subtitle}>
                            {'untuk talent'}
                            <BlueCircleQuestionMark
                                width={15}
                                height={15}
                            />
                        </div>
                    </div>
                    <InputSelect
                        className={style.max_video_selector}
                        defaultValue={{label: '1', value: 1}}
                        options={
                            [1, 2, 3, 4, 5]
                            .map(value => ({
                                label: value + '',
                                value
                            }))
                        }
                        onChange={newValue => {
                            setMaxVideo(newValue.value);
                        }}
                    />
                </div>
            </div>
        </div>
    )
}