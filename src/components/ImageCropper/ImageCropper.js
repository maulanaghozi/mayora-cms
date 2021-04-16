import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import style from './ImageCropper.module.scss';
import {WhiteCross} from '../../assets/image';

export default function ImageCropper(props) {
    const {
        rawImage,
        handleCrop,
        setCroppedImage,
        initialHeight,
        initialWidth,
        fixed,
    } = props;

    const [imageRef, setImageRef] = useState(null);
    const [crop, setCrop] = useState(
        fixed ?
        {
            unit: '%',
            width: 100,
            aspect: initialWidth / initialHeight
        } :
        {
            x: 0,
            y: 0,
            width: 288,
            height: 162
        }
    );

    const handleImageLoaded = image => {
        const initialCrop = {
            x: 0,
            y: 0,
            width: initialWidth || 375,
            height: initialHeight || 115
        }
        getCroppedImg(image, initialCrop, 'newFile.jpeg')
        .then(croppedImage => {
            setCroppedImage(croppedImage);
            setImageRef(image);
        })
    }

    const handleCropComplete = crop => {
        makeClientCrop(crop);
    }

    const handleCropChange = (crop, percentCrop) => {
        setCrop(crop);
    }

    const makeClientCrop = crop => {
        if (imageRef && crop.width && crop.height) {
            getCroppedImg(imageRef, crop, 'newFile.jpeg')
            .then(croppedImage => {
                setCroppedImage(croppedImage);
            });
        }
    }

    const getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    
        return new Promise((resolve, reject) => {
            resolve(canvas.toDataURL('image/jpeg'));
        });
    }

    return (
        <div className={style.cropper_container}>
            <ReactCrop
                src={rawImage}
                crop={crop}
                ruleOfThirds
                onImageLoaded={handleImageLoaded}
                onComplete={handleCropComplete}
                onChange={handleCropChange}
            />
            {
                props.handleCancel &&
                <div
                    className={style.close}
                    onClick={props.handleCancel}
                >
                    <WhiteCross
                        width={20}
                        height={20}
                    />
                </div>
            }
            <button className={style.button__white} onClick={handleCrop}>
                {'CROP'}
            </button>
        </div>
    )
}