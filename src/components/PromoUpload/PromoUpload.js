import React, { useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import ImageCropper from '../ImageCropper/ImageCropper';
import {base64ToBlob} from '../../utility/utility'; 

import { ReactComponent as PlusIcon } from '../../assets/plus.svg';
import { ReactComponent as ImageIcon } from '../../assets/image.svg';

import {
    container, field, tagline, upload, upload_photo,
    note, button, btnSave, btnPublish, input_file,
    label_input, label_content, add_label
} from './PromoUpload.module.scss';

const PROMO_IMAGE_ASPECT = 375 / 115;

export default function PromoUpload(props) {
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

    return (
        <div className={container}>
            <span className={tagline}>upload banner</span>
            <div className={upload}>
                <span className={field}>Image : </span>
                <label className={label_input}>
                    <input
                        type={'file'}
                        className={input_file}
                        onChange={handleInputFileChange}
                        accept='image/*'
                    />
                    <div className={upload_photo}>
                        <img src={image} height={image ? 115 : 0} width={image ? 375 : 0} />
                        {
                            !image &&
                            <div className={add_label}>
                                <PlusIcon />
                                <span>Upload</span>
                                <span>Photo</span>
                            </div>
                        }
                        {
                            image &&
                            <div className={label_content}>
                                <div>
                                    <ImageIcon />
                                </div>
                                <div>Choose from computer</div>
                            </div>
                        }
                    </div>
                    <div className={note}>*ekstensi file yang diperbolehkan .jpg, .png</div>
                </label>
            </div>
            <div className={button}>
                {
                    props.active ?
                    <button className={btnPublish} onClick={props.publish}>
                        {props.isSaving ? 'SAVING...' : 'SAVE'}
                    </button>
                    :
                    <>
                        <button className={btnSave} onClick={props.save}>
                            {props.isSaving ? 'SAVING...' : 'SAVE AS DRAFT'}
                        </button>
                        <button className={btnPublish} onClick={props.publish}>
                            {props.isPublishing ? 'PUBLISHING...' : 'PUBLISH'}
                        </button>
                    </>
                }
            </div>
            {
                cropIsNeeded &&
                <ImageCropper
                    rawImage={rawImage}
                    handleCrop={handleCrop}
                    setCroppedImage={setCroppedImage}
                    initialHeight={115}
                    initialWidth={375}
                    fixed={true}
                />
            }
        </div>
    )
}