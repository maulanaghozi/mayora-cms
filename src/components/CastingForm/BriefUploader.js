import React, { useState, useEffect, useRef } from 'react';
import style from './CastingForm.module.scss';
import BriefHoverLayer from './BriefHoverLayer';

import {
    BluePlus,
    RedBin,
    ZoomIn
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
import WarningModal from '../WarningModal/WarningModal';
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
    const [currentState, setCurrentState] = useState(props.brief ? 'loading' : 'empty');
    const [localObjectURL, setLocalObjectURL] = useState(null);
    const [briefType, setBriefType] = useState(props.brief ? getContentType(props.brief.brief_url) : {ext: null, type: null});

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
        if (props.brief) {
            const type = getContentType(props.brief.brief_url);
            setBriefType(type);
        }

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
        
        if (!props.brief) {
            setCurrentState('empty');
            setKey(key + 1);
        }
    }

    const uploadFile = (file) => {
        const data = new FormData();
        const localFileUrl = URL.createObjectURL(file);

        let fileType;

        if (file.name) {
            fileType = getContentType(file.name);
            data.append('brief', file);
        } else {
            fileType = {type: 'image', ext: 'jpg'};
            data.append('brief', file, 'brief.jpg')
        }
        
        let newUploader;

        
        // add new uploader
        if (
            (props.totalUploader < 5) &&
            (props.index === (props.totalUploader - 1))
        ) {
            newUploader = props.generateUploader();
        }

        // change state to uploading
        setCurrentState('uploading');
        setBriefType(fileType);
        setLocalObjectURL(localFileUrl);
        
        const params = {}
        
        if (props.brief) {
            params.method = 'POST';
            params.path = `posting/brief/update/${props.brief.id}`;
        } else {
            params.method = 'PUT';
            params.path = 'posting/brief/create';
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

                props.updateBrief(result.payload[0], localFileUrl);
            } else {
                setCurrentState('empty');
                
                if (props.brief) {
                    setLocalObjectURL(props.brief.brief_url);
                } else {
                    props.removeUploader(newUploader);
                }

                alert.error('failed to upload brief, please try again');
            }
        })
    }

    const handleInputFileChange = e => {
        if (e.target.files) {
            const file = e.target.files[0];
            const localFileUrl = URL.createObjectURL(file);
            const fileType = getContentType(file.name);

            if (fileType.type === 'image') {
                setCropIsNeeded(true);
                setLocalObjectURL(localFileUrl);
            } else {
                uploadFile(file);
            }
        }
    }

    const openWarningModal = () => {
        if (!warning) {
            setWarning(true);
        }
    }

    const closeWarningModal = () => {
        if (warning) {
            setWarning(false);
        }
    }

    const openContentViewer = () => {
        if (!props.contentView) {
            props.setContentView(props.index + 1);
        }
    }

    const closeContentViewer = () => {
        if (props.contentView) {
            props.setContentView(false);
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

    const removeBrief = () => {
        closeWarningModal();
        setCurrentState('loading');

        http({
            method: 'DELETE',
            path: `posting/brief/remove/${props.brief.id}`
        }).then(result => {

            if (result && result.code === 'success') {
                props.updateBrief(null);
                props.removeUploader();
            } else {
                alert.error('failed to delete brief, please try again');
            }
        })
    }

    const renderBriefViewer = () => {
        let viewer;

        switch (briefType.type) {
            case 'image':
                viewer = (
                    <CSSTransition
                        timeout={200}
                        classNames={fadeTransition}
                    >
                        <>
                            <img
                                src={localObjectURL || props.brief.brief_url}
                                className={classNames(
                                    style.brief_content,
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
                )
                break;
            case 'video':
                viewer = (
                    <CSSTransition
                        timeout={200}
                        classNames={fadeTransition}
                    >
                        <>
                            <video
                                src={
                                    localObjectURL ? (localObjectURL + '#t=0.5') :
                                    (props.brief.brief_url + '#t=0.5')
                                }
                                autoPlay={false}
                                controls={false}
                                preload={'metadata'}
                                className={style.brief_content}
                                onLoadedMetadata={() => {
                                    setTimeout(() => {
                                        setCurrentState('ready');
                                    }, 200);
                                }}
                                onError={e => {
                                    setCurrentState('fallback')
                                }}
                                onErrorCapture={e => {
                                    setCurrentState('fallback')
                                }}
                                ref={viewerRef}
                            />
                            {
                                currentState === 'ready' && <div className={style.play_button} />
                            }
                        </>
                    </CSSTransition>
                )
                break;
            default:
                viewer = null;
                break;
        }

        return viewer;
    }

    return (
        <div
            className={classNames(
                style.brief_uploader,
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
            {
                ((props.index + 1) && currentState === 'ready') &&
                <>
                    <div className={style.brief_index}>
                        <div>{props.index + 1}</div>
                    </div>
                    {
                        (!touchDevice || isHovered) &&
                        <>
                            <div className={style.red_bin} onClick={openWarningModal}>
                                <RedBin
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={style.zoom_in} onClick={openContentViewer}>
                                <ZoomIn
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </>
                    }
                </>
            }
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
                    (
                        briefType.type !== 'image' &&
                        briefType.type !== 'video' &&
                        currentState === 'empty'
                    ) &&
                    <div className={style.upload_label}>
                        <BluePlus />
                        <div>Upload</div>
                        <div>Video/Foto</div>
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
                    <BriefHoverLayer />
                }
            </label>
            <div className={style.brief_viewer}>
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
                    renderBriefViewer()
                }
                {
                    currentState === 'fallback' &&
                    null
                    // <TODO>
                    // Add fallback image here
                }
            </div>
            {warning && <WarningModal
                title={'Brief'}
                content={'Are you sure want to delete this brief?'}
                leftOption={'YES'}
                rightOption={'NO'}
                leftAction={removeBrief}
                rightAction={closeWarningModal}
                close={closeWarningModal}
            />}
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