import React, { useState, useEffect, useRef } from 'react';
import style from './CastingForm.module.scss';

import {
    BluePlus,
    ImageIcon
} from '../../assets/image';
import {
    getContentType,
    isTouchDevice
} from '../../utility/utility';
import {http} from '../../utility/http';
import {base64ToBlob} from '../../utility/utility';
import classNames from 'classnames';
import {useAlert} from 'react-alert';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Loading from '../Loading/Loading';
import ImageCropper from '../ImageCropper/ImageCropper';

const fadeTransition = {
    enter: style.fade_enter,
    enterActive: style.fade_enter_active,
    exit: style.fade_exit,
    exitActive: style.fade_exit_active,
    appear: style.fade_enter,
    appear_active: style.fade_enter_active
}

let hoverTime;

export default props => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [currentState, setCurrentState] = useState(props.thumbnail ? 'loading' : 'empty');
    const [localObjectURL, setLocalObjectURL] = useState(null);

    // touch device state
    const [touchDevice, setTouchDevice] = useState(isTouchDevice());
    const [isHovered, setIsHovered] = useState(false);

    // modal state
    const [warning, setWarning] = useState(false);

    // crop state
    const [cropIsNeeded, setCropIsNeeded] = useState(false);
    const [croppedImage, setCroppedImage] = useState('')

    const viewerRef = useRef(null);
    const uploaderRef = useRef(null);
    const labelRef = useRef(null);
    
    const [key, setKey] = useState(0);

    useEffect(() => {
        // if (uploadProgress === 100) {
        //     setCurrentState('loading');
        // }
    }, [uploadProgress]);

    useEffect(() => {
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isHovered]);

    const alert = useAlert();

    const handleClickOutside = e => {
        if (
            viewerRef.current &&
            !viewerRef.current.contains(e.target) &&
            uploaderRef.current &&
            !uploaderRef.current.contains(e.target) &&
            labelRef.current &&
            !labelRef.current.contains(e.target)
        ) {
            closeHoverLayer();
        }
    }

    const handleCrop = () => {
        setCropIsNeeded(false);

        // convert data uri to blob
        const jpegFile64 = croppedImage.replace(/^data:image\/(png|jpeg);base64,/, "");
        const jpegBlob = base64ToBlob(jpegFile64, 'image/jpeg');

        uploadFile(jpegBlob);
    }

    const handleCancelCrop = () => {
        setCropIsNeeded(false);
        
        if (!props.thumbnail) {
            setCurrentState('empty');
            setKey(key + 1);
        }
    }

    const uploadFile = (file) => {
        const data = new FormData();
        const localFileUrl = URL.createObjectURL(file);

        data.append('thumbnail', file, 'thumbnail.jpg')

        // change state to uploading
        setCurrentState('uploading');
        setLocalObjectURL(localFileUrl);
        
        const params = {}
        
        if (props.thumbnail) {
            params.method = 'POST';
            params.path = `posting/thumbnail/update/${props.thumbnail.id}`;
        } else {
            params.method = 'PUT';
            params.path = 'posting/thumbnail/create';
        }
        
        http(
            {
                ...params,
                data
            },
            uploadProgress,
            setUploadProgress
        )
        .then(result => {
            if (result && result.code === 'success') {
                setCurrentState('loading');

                // set key to re-render input tag
                setKey(key + 1);

                props.updateThumbnail(result.payload);
            } else {
                setCurrentState('empty');
                
                if (props.thumbnail) {
                    setLocalObjectURL(props.thumbnail.thumbnail_url);
                }

                alert.error('failed to upload thumbnail, please try again');
            }
        })
    }

    const handleInputFileChange = e => {
        if (e.target.files) {
            const file = e.target.files[0];
            const localFileUrl = URL.createObjectURL(file);

            setCropIsNeeded(true);
            setLocalObjectURL(localFileUrl);
        }
    }

    const openHoverLayer = () => {
        if (touchDevice && !isHovered && currentState === 'ready') {
            setIsHovered(true);
            hoverTime = performance.now();
        }
    }

    const closeHoverLayer = () => {
        if (touchDevice && isHovered && currentState === 'ready') {
            setIsHovered(false);
        }
    }

    return (
        <div
            className={classNames(
                style.thumbnail_uploader,
                {
                    [style.dashed_border]: currentState !== 'ready',
                    [style.no_border]: currentState === 'ready',
                    [style.no_touch]: !touchDevice,
                    [style.touch]: touchDevice
                },
            )}
            onTouchStart={openHoverLayer}
            ref={uploaderRef}
        >
            <label ref={labelRef}>
                <input
                    key={key}
                    type={'file'}
                    onChange={handleInputFileChange}
                    accept={'.jpg,.jpeg,.png,.gif,.svg,.mp4,.ogg,.webm'}
                    disabled={touchDevice && !isHovered && currentState !== 'empty'}
                    onClick={e => {
                        if (performance.now() - hoverTime < 200) {
                            e.preventDefault();
                        }
                    }}
                />
                {
                    currentState === 'empty' &&
                    <div className={style.upload_label}>
                        <BluePlus />
                        <div>Upload</div>
                        <div>Foto</div>
                    </div>
                }
                {
                    (
                        currentState === 'loading' ||
                        currentState === 'ready'
                    ) && (
                        (
                            isHovered &&
                            touchDevice
                        ) ||
                        !touchDevice
                    )
                    &&
                    <HoverLayer />
                }
            </label>
            <div className={style.thumbnail_viewer}>
                {
                    currentState === 'uploading' &&
                    <CSSTransition
                        timeout={200}
                        classNames={fadeTransition}
                    >
                        <Loading />
                    </CSSTransition>
                }
                {
                    (
                        currentState === 'loading' ||
                        currentState === 'ready'
                    ) &&
                    <CSSTransition
                        timeout={200}
                        classNames={fadeTransition}
                    >
                        <>
                            <img
                                src={localObjectURL || props.thumbnail.thumbnail_url}
                                className={classNames(
                                    style.thumbnail_content,
                                    {[style.hidden]:currentState === 'loading'}
                                )}
                                ref={viewerRef}
                                onLoad={() => {
                                    setTimeout(() => {
                                        setCurrentState('ready');
                                    }, 200);
                                }}
                            />
                        </>
                    </CSSTransition>
                }
            </div>
            {
                cropIsNeeded &&
                <ImageCropper
                    rawImage={localObjectURL}
                    handleCrop={handleCrop}
                    handleCancel={handleCancelCrop}
                    setCroppedImage={setCroppedImage}
                    initialHeight={288}
                    initialHeight={162}
                />
            }
        </div>
    )
}

const HoverLayer = () => {
    return (
        <div className={style.hover_layer}>
            <div className={style.hover_label}>
                <div className={style.icon}>
                    <ImageIcon />
                </div>
                <div className={style.text}>Ganti</div>
                <div className={style.text}>Thumbnail</div>
            </div>
        </div>
    )
}