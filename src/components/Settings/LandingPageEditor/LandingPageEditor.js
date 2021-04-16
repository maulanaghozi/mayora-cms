import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as ImageIcon } from '../../../assets/image.svg'
import {
    container, content_wrapper, number, background_image,
    phrase, remove_button, file_input, custom_file_input,
    file_input_container, label_content, text_input,
    text_input_container, text_input_counter,
    remove_button_container
} from './LandingPageEditor.module.scss';
import { useAlert } from 'react-alert';
import {http} from '../../../utility/http';

const maxChar = 75;

export default function LandingPageEditor(props) {
    const [inputValue, setInputValue] = useState(props.landingPage.catch_phrase);
    const fileRef = useRef(null);
    const alert = useAlert();

    useEffect(() => {
        let newLandingPages = props.landingPages.slice();

        newLandingPages[props.index].catch_phrase = inputValue;
        props.setLandingPages(newLandingPages);
    }, [inputValue]);

    useEffect(() => {
        setInputValue(props.landingPages[props.index].catch_phrase)
    }, [props.landingPages])

    const handleRemove = () => {
        let newLandingPages = props.landingPages.slice();

        if (newLandingPages.length > 1) {
            http({
                method: 'DELETE',
                path: 'promotion/landing-page/' + newLandingPages[props.index].id
            })
            .then(result => {
                if (result && result.code === 'success') {
                    newLandingPages.splice(props.index, 1);
                    props.setLandingPages(newLandingPages);
                } else {
                    alert.error('failed to delete landing page, please try again')
                }
            })
        }
    }

    const handleInputChange = e => {
        if (e.target.name === 'phrase' && e.target.value.length < maxChar + 1) {
            setInputValue(e.target.value)
        }
    }

    const handleInputFileChange = e => {
        let newLandingPages = props.landingPages.slice();

        newLandingPages[props.index].image_url = URL.createObjectURL(fileRef.current.files[0]);
        newLandingPages[props.index].file = e.target.files[0];

        props.setLandingPages(newLandingPages);
    }


    return (
        <div className={container}>
            {/**
              * Number
              */}
            <div className={content_wrapper}>
                <span className={number}>{(props.index + 1) + '.'}</span>
            </div>
            {/**
              * Input File
              */}
            <div className={file_input_container}>
                <label
                    name={'file' + props.index}
                    className={custom_file_input}
                    style={{
                        backgroundImage: `url(${props.landingPage.image_url})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center'
                    }}
                >
                    <input
                        name={'file' + props.index}
                        type='file'
                        className={file_input}
                        ref={fileRef}
                        onChange={handleInputFileChange}
                        accept='image/*'
                    />
                    <div className={label_content}>
                        <ImageIcon />
                    </div>
                    <div className={label_content}>Choose from computer</div>
                </label>
                <span>Background</span>
            </div>
            {/**
              * Quick phrase
              */}
            <div className={content_wrapper}>
                <span className={phrase}>Quick Phrase: </span>
            </div>
            {/**
              * Input Text
              */}
            <div className={text_input_container}>
                <textarea
                    type={'text'}
                    name={'phrase'}
                    value={inputValue}
                    onChange={handleInputChange}
                    className={text_input}
                />
                <div className={text_input_counter}>
                    {props.landingPage.catch_phrase.length + '/' + maxChar}
                </div>
            </div>
            {/**
              * Remove button
              */}
            <div className={remove_button_container}>
                <div className={remove_button} onClick={handleRemove}>
                    <div></div>
                </div>
            </div>
        </div>
    )
}