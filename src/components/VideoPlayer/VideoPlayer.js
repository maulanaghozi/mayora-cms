import React, { useEffect, useState, useRef } from 'react';
import videojs from 'video.js';
import classNames from 'classnames';
import 'video.js/dist/video-js.css';
import './VideoPlayer.css';

export default React.memo((props) => {
    const videoNode = useRef(null);

    const {
        player,
        setPlayer,
        className,
        ...videoJsProps
    } = props;

    useEffect(() => {
        const videoJsPlayer = videojs(videoNode.current, videoJsProps);
        props.setPlayer(videoJsPlayer);

        return () => {
            if (props.player) {
                props.player.dispose();
            }
        }
    }, []);

    return (
        <div style={{marginBottom: 3}} className={className}>	
            <div data-vjs-player>
                <video
                    ref={videoNode}
                    style={{width: '100%'}}
                    className={classNames(
                        'video-js vjs-kestingrum',
                        {['vjs-16-9']: props.fixed}
                    )}
                ></video>
            </div>
        </div>
    )
})