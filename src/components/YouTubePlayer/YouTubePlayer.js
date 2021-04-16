import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import style from './YouTubePlayer.module.scss';

const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

export default function YouTubePlayer(props) {
    const [videoId, setVideoId] = useState(null);
    
    useEffect(() => {
        const match = props.videoUrl.match(rx);
        
        if (Array.isArray(match) && match[1]) {
            setVideoId(match[1])
        }
    }, [props.videoUrl]);

    const onReady = (event) => {
        if (!event.target.getDuration()) {
            setVideoId(null);
        }

        if (props.onReady) {
            props.onReady(event.target);
        }

        event.target.pauseVideo();
    }

    const opts = {
        className: style.container,
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: props.autoplay || 0,
            controls: props.controls || 1,
            enablejsapi: 1
        }
    }

    return (
        <div className={style.wrapper}>
            {
                videoId ?
                <YouTube
                    videoId={videoId}
                    className={style.iframe}
                    containerClassName={style.container}
                    opts={opts}
                    onReady={onReady}
                /> :
                <div
                    className={style.fallback}
                >
                    <span>{'Video Not Found'}</span>
                // </div>
                // <YouTube
                //     videoId={'iuhdaejnf'}
                //     opts={opts}
                //     onReady={onReady}
                //     className={style.iframe}
                //     containerClassName={style.container}
                // />
            }
        </div>
    )
}