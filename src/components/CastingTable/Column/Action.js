import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { http } from '../../../utility/http';
import { ReactComponent as ViewIcon } from '../../../assets/eye.svg';
import { ReactComponent as MoreIcon } from '../../../assets/more_horizontal.svg';
import { ReactComponent as CastingIcon } from '../../../assets/clapperboard.svg';

import style from '../CastingTable.module.scss';

export default function Action(props) {
    const [isOpen, setIsOpen] = useState(false)
    const boxRef = useRef(null)
    const moreRef = useRef(null)
    const alert = useAlert()

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleClickOutside = (event) => {
        if (
            boxRef.current &&
            !boxRef.current.contains(event.target) &&
            moreRef.current &&
            !moreRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        if ((props.openRow !== props.index) && isOpen) {
            setIsOpen(false)
        }
    }, [props.openRow])

    const handleClick = () => {
        if (!isOpen) {
            props.setOpenRow(props.index)
        }
        setIsOpen(!isOpen)
    }

    const handlePushNotification = () => {
        const params = {
            method: 'POST',
            path: 'notification/notif',
            data: {

            }
        }

        http(params)
            .then(response => {
                if (response && response.code === 'success') {
                    alert.success('Push Notification Success');
                    setIsOpen(false);
                } else {
                    alert.error('Push Notification Failed');
                    setIsOpen(false);
                }
            })
    }

    const handleDeleteCasting = () => {
        const params = {
            method: 'DELETE',
            path: `posting/casting/remove/${props.row.casting_id}`
        }

        http(params)
            .then(result => {
                if (result && result.code === 'success') {
                    props.setKey();
                    setIsOpen(false);
                    props.setOpenRow(null);
                } else {
                    setIsOpen(false);
                    props.setOpenRow(null);
                    alert.error('Delete failed');
                }
            })
    }

    return (
        <div className={classNames(
            style.table_cell,
            style.column_action
        )}>
            {
                props.row.status !== 'draft' &&
                <Link
                    to={{
                        pathname: `/casting/view-applicant/${props.row.casting_id}`,
                        state: {
                            from: '/casting'
                        }
                    }}
                    className={style.action}
                >
                    <CastingIcon />
                </Link>
            }
            <Link
                to={'/casting/detail/' + props.row.casting_id}
                className={style.action}
            >
                <ViewIcon />
            </Link>
            <div className={style.more_action}>
                <div
                    ref={moreRef}
                    onClick={handleClick}
                    className={classNames(
                        style.more_container,
                        {[style.open]: isOpen}
                    )}
                >
                    <MoreIcon />
                </div>
                {
                    isOpen &&
                    <div
                        ref={boxRef}
                        className={classNames(
                            style.more_box,
                            {[style.reverse]: props.index > props.totalRow - 3}
                        )}>
                        <Link
                            className={style.more_link}
                            to={{
                                pathname: `casting/edit/${props.row.casting_id}`,
                                state: { data: props.row }
                            }}
                        >
                            <div className={style.more_text}>
                                {'Edit'}
                            </div>
                        </Link>
                        <div
                            onClick={handlePushNotification}
                            className={style.more_text}
                        >
                            {'Push Notification'}
                        </div>
                        <div
                            onClick={handleDeleteCasting}
                            className={classNames(
                                style.more_text,
                                style.red
                            )}
                        >
                            {'Delete'}
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}