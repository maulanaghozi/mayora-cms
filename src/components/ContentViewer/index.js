import React, { useState, useEffect } from 'react';
import style from './ContentViewer.module.scss';
import {
    WhiteCross,
    ChevronLeftWhite,
    ChevronRightWhite
} from '../../assets/image';
import {getContentType} from '../../utility/utility';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import classNames from 'classnames';
import Loading from '../Loading/Loading';
import YouTubePlayer from '../YouTubePlayer/YouTubePlayer';

export default function ContentViewer(props) {
    const [currentIndex, setCurrentIndex] = useState(props.index || 0);
    const [currentType, setCurrentType] = useState({type: null, ext: null});
    const [player, setPlayer] = useState(null);
    const [currentState, setCurrentState] = useState('loading');

    useEffect(() => {
        const type = getContentType(props.content[currentIndex]);
        setCurrentType(type);
        setCurrentState('loading');
    }, [currentIndex])

    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        
        return () => {
            document.documentElement.style.overflow = 'auto';
        }
    }, [])

    const next = () => {
        if (currentIndex < props.content.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    }

    const previous = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(props.content.length - 1)
        }
    }

    return (
        <div className={style.container}>
            <div className={style.page_counter}>
                {(currentIndex + 1) + '/' + props.content.length}
            </div>
            <div
                className={style.close}
                onClick={() => {
                    props.setShow(false);
                }}
            >
                <WhiteCross
                    width={20}
                    height={20}
                />
            </div>
            <div className={style.viewer_container}>
                <div className={classNames(style.button_container, style.previous)}>
                    <div
                        className={style.button}
                        onClick={previous}
                    >
                        <ChevronLeftWhite
                            width={20}
                            height={20}
                        />
                    </div>
                </div>
                <div className={style.content_container}>
                    {
                        currentType.type === 'image' &&
                        <img
                            className={classNames(
                                style.content_image,
                                {[style.show]: currentState === 'ready'}
                            )}
                            src={props.localContent[currentIndex] || props.content[currentIndex]}
                            onLoad={() => {
                                setCurrentState('ready');
                            }}
                        />
                    }
                    {
                        currentType.type === 'video' &&
                        <VideoPlayer
                            className={style.content_video}
                            player={player}
                            setPlayer={setPlayer}
                            autoplay={false}
                            controls={true}
                            fluid={true}
                            preload={'metadata'}
                            sources={[{
                                src: (props.localContent[currentIndex] || props.content[currentIndex]) + '#t=0.5',
                                type: 'video/' + currentType.ext
                            }]}
                            fixed={true}
                        />
                    }
                    {
                        currentType.type === 'youtube' &&
                        <YouTubePlayer
                            videoUrl={props.content[currentIndex]}
                            onReady={() => {
                                setCurrentState('ready');
                            }}
                        />
                    }
                    {
                        (
                            currentState === 'loading' &&
                            currentType.type !== 'video'
                        ) && <Loading />
                    }
                </div>
                <div className={classNames(style.button_container, style.next)}>
                    <div
                        className={style.button}
                        onClick={next}
                    >
                        <ChevronRightWhite
                            width={20}
                            height={20}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
