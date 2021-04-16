import React, { useEffect, useState } from 'react'
import InputText from '../InputText/InputText'
import classNames from "classnames";

import { ReactComponent as PlusIcon } from '../../assets/plus.svg';
import { ReactComponent as ImageIcon } from '../../assets/image.svg';

import style from './PortfolioUpload.module.scss'
import { ReactComponent as LinkIcon } from '../../assets/link.svg';
import YouTubePlayer from '../YouTubePlayer/YouTubePlayer';
import ImageCropper from '../ImageCropper/ImageCropper';
import {base64ToBlob} from '../../utility/utility'; 
const PROMO_IMAGE_ASPECT = 347 / 196;


export default function PortfolioUpload(props) {
    const [image, setImage] = useState(props.initialImage || '');
    const [croppedImage, setCroppedImage] = useState('');
    const [cropIsNeeded, setCropIsNeeded] = useState(false);
    
    const [rawImage, setRawImage] = useState('');


    const handleInputFileChange = e => {
        const imgUrl = URL.createObjectURL(e.target.files[0]);

        setRawImage(imgUrl);

        // get picked image heigt and width
        const rawImg = new Image();
        rawImg.onload = e => {
            setCropIsNeeded((rawImg.width / rawImg.height) !== PROMO_IMAGE_ASPECT);
        }
        rawImg.src = imgUrl;

    }

    const handleCrop = () => {
        setCropIsNeeded(false);

        // set cropped image data uri to image props
        // it will be used to show cropped image on
        // img tag in the upload form
        setImage(croppedImage);

        // convert data uri to blob
        const jpegFile64 = croppedImage.replace(/^data:image\/(png|jpeg);base64,/, "");
        const jpegBlob = base64ToBlob(jpegFile64, 'image/jpeg');

        props.onImageChange(jpegBlob);
        setRawImage('');
    }
    const publish = () => {
        props.submit('published');
    }

    const saveDraft = () => {
        props.submit('draft');
    }

    return (
        <div className={style.container}>
            <p className={style.tagline}>{'THUMBNAIL & VIDEO'}</p>
            <div className={classNames(style.upload, style.thumbnail)}>
                <span className={style.field}>Image : </span>
                <label className={style.label_input}>
                    <input
                        type={'file'}
                        className={style.input_file}
                        onChange={handleInputFileChange}
                        accept='image/*'
                    />
                    <div className={style.upload_photo}>
                        <img src={image} height={image ? 196 : 0} width={image ? 347 : 0} />
                        {
                            !image &&
                            <div className={style.add_label}>
                                <PlusIcon />
                                <span>Upload</span>
                                <span>Thumbnail</span>
                            </div>
                        }
                        {
                            image &&
                            <div className={style.label_content}>
                                <div>
                                    <ImageIcon />
                                </div>
                                <div>Choose from computer</div>
                            </div>
                        }
                    </div>
                    <div className={style.note}>*ekstensi file yang diperbolehkan .jpg, .png</div>
                </label>
            </div>
            <div className={style.upload}>
                <div className={style.field_container}>
                    <div className={style.field}>
                        <p>Video : </p>
                        <p className={style.note}>{'(Optional)'}</p>
                    </div>
                    <YouTubePlayer key={props.createCriteria.video_url} videoUrl={props.createCriteria.video_url} />
                </div>
                <div className={classNames(style.field_container, style.link_yt)}>
                    <p className={style.field}></p>
                    <LinkIcon />
                    <InputText
                        name={'vid_url'}
                        placeholder={'input link youtube here'}
                        setValue={value => props.setCreateCriteria({ video_url: value })}
                        className={style.input}
                        value={props.createCriteria.video_url}
                    />
                </div>
            </div>
            <div className={style.button}>
                {
                    props.status === 'published' ?
                    <>
                        <button className={style.btnPublish} onClick={publish}>SAVE</button>
                    </> :
                    <>
                        <button className={style.btnSave} onClick={saveDraft}>SAVE AS DRAFT</button>
                        <button className={style.btnPublish} onClick={publish}>PUBLISH</button>
                    </>
                }
            </div>
            {
                cropIsNeeded &&
                <ImageCropper
                    rawImage={rawImage}
                    handleCrop={handleCrop}
                    setCroppedImage={setCroppedImage}
                    initialHeight={196}
                    initialWidth={347}
                    fixed={true}
                />
            }
        </div>
    )
}