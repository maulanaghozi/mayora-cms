import React, { useState } from 'react';
import style from './BriefViewer.module.scss';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import classNames from 'classnames';

import {
    ChevronLeft,
    ChevronRight,
    ChevronLeftBlue,
    ChevronRightBlue
} from '../../assets/image';

import { getContentType } from '../../utility/utility';

export default function BriefViewer(props) {
    const [currentBrief, setCurrentBrief] = useState(0);
    const [player, setPlayer] = useState(null);

    let briefType;

    if (typeof props.url[currentBrief] === 'string') {
        briefType = getContentType(props.url[currentBrief]);
    }

    const isPreviousDisabled = () => (currentBrief === 0);
    const isNextDisabled = () => (currentBrief === (props.url.length - 1));

    const next = () => {
        if (!isNextDisabled()) {
            setCurrentBrief(currentBrief + 1);
        }
    }

    const previous = () => {
        if (!isPreviousDisabled()) {
            setCurrentBrief(currentBrief - 1);
        }
    }
    
    return (
        <>
            {
                Array.isArray(props.url) && props.url.length > 0 ?
                <div className={style.container}>
                    {
                        briefType && briefType.type === 'video' ?
                        <VideoPlayer
                            player={player}
                            setPlayer={setPlayer}
                            autoplay={false}
                            controls={true}
                            fluid={true}
                            preload={'metadata'}
                            sources={[{
                                src: props.url[currentBrief] + '#t=0.5',
                                type: 'video/' + briefType.ext
                            }]}
                        /> : 
                        (
                            briefType && briefType.type === 'image' ?
                            <img
                                src={props.url[currentBrief]}
                                className={style.brief_image}
                            /> :
                            // <TODO>
                            // add fallback image here
                            ''
                        )
                    }
                    <div className={style.footer}>
                        <div className={style.counter}>
                            {(currentBrief + 1) + ' / ' + props.url.length}
                        </div>
                        <div className={style.button_container}>
                            <div
                                className={classNames(
                                    style.button,
                                    {[style.active]: !isPreviousDisabled()}
                                )}
                                onClick={previous}
                            >
                                {
                                    isPreviousDisabled() ?
                                    <ChevronLeft 
                                        width={10}
                                        height={15}
                                        opacity={0.25}
                                    /> :
                                    <ChevronLeftBlue
                                        width={10}
                                        height={15}
                                    />
                                }
                            </div>
                            <div
                                className={classNames(
                                    style.button,
                                    {[style.active]: !isNextDisabled()}
                                )}
                                onClick={next}
                            >
                                {
                                    isNextDisabled() ?
                                    <ChevronRight
                                        width={10}
                                        height={15}
                                        opacity={0.25}
                                    /> :
                                    <ChevronRightBlue
                                        width={10}
                                        height={15}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                : 'Brief is not uploaded yet'
            }
        </>
    )
}
