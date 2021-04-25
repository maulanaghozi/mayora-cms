import React from 'react';
import PropTypes from 'prop-types'
import style from './WarningModal.module.scss';
import Loading from '../Loading/Loading';

export default function WarningModal(props) {
    return (
        <div className={style.modal_container}>
            <div className={style.modal_box}>
                <div className={style.modal_title}>{props.title}</div>
                <div className={style.modal_content}>{props.content}</div>
                <div className={style.button_container}>
                    <button className={style.yes_button} onClick={props.leftAction}>
                        {props.leftOption}
                        {props.isLoading && <Loading className={style.loading} />}
                    </button>
                    <button className={style.no_button} onClick={props.rightAction}>{props.rightOption}</button>
                </div>
                <button className={style.close_button} onClick={props.close} />
            </div>
        </div>
    )
}

WarningModal.propTypes = {
    /**Modal title */
    title: PropTypes.string,

    /**Modal question */
    content: PropTypes.string,

    /**Left button text */
    leftOption: PropTypes.string,

    /**Right button text */
    rightOption: PropTypes.string,

    /**Callback for left button when clicked */
    leftAction: PropTypes.func,

    /**Callback for right button when clicked */
    rightAction: PropTypes.func,

    /**Callback for close button when clicked */
    close: PropTypes.func
}
