import React, {useState} from 'react';
import { ReactComponent as ChevronLeft } from '../../../assets/chevron_left_white.svg';
import { ReactComponent as ChevronRight } from '../../../assets/chevron_right_white.svg';
import {
    preview_container, preview, close, preview_image,
    preview_footer, chevron_icon
} from './PreviewLandingPages.module.scss';

export default function PreviewLandingPages(props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if(currentIndex < props.landingPages.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(props.landingPages.length - 1);
        }
    }

    const handlePrevious = () => {
        if(currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    return (
        <div className={preview_container}>
            <div className={preview}>
                <div
                    className={preview_image}
                    style={{backgroundImage: 'url(' + props.landingPages[currentIndex].pic_url +')'}}
                />
                <div className={preview_footer}>
                    <ChevronLeft className={chevron_icon} onClick={handlePrevious} />
                    <div>{(currentIndex + 1) + ' / ' + props.landingPages.length}</div>
                    <ChevronRight className={chevron_icon} onClick={handleNext} />
                </div>
            </div>
            <div className={close} onClick={() => props.setInPreview(false)}></div>
        </div>
    )
}