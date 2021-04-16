import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { http } from '../../../utility/http';

import { ReactComponent as BellIcon } from '../../../assets/bell.svg';
import { ReactComponent as MoreIcon } from '../../../assets/more_horizontal.svg';
import { ReactComponent as EditIcon } from '../../../assets/edit.svg';

import {
    table_cell,
    column_action,
    more_container,
    open,
    more_box,
    more_text,
    red,
    reverse,
    push_notif
} from '../PromoTable.module.scss';

export default function Action(props) {
    const [isOpen, setIsOpen] = useState(false);
    const boxRef = useRef(null);
    const moreRef = useRef(null);
    const alert = useAlert();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

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
        if (
            (props.openRow !== props.index) &&
            isOpen
        ) {
            setIsOpen(false);
        }
    }, [props.openRow]);

    const handleOpenMore = () => {
        if (!isOpen) {
            props.setOpenRow(props.index);
        }

        setIsOpen(!isOpen);
    }

    const deletePromo = () => {
        http({
            method: 'DELETE',
            path: 'promotion/promo/' + props.row.id
        }).then(result => {
            if (result && result.code === 'success') {
                setIsOpen(false);
                props.setOpenRow(null);
                props.setKey();
                alert.success(result.message);
            } else {
                alert.error(result.message);
            }
        });
    }

    const handlePushNotif = async () => {
        await http({
            method: 'GET',
            path: 'promotion/promo/push/' + props.row.id
        }).then(result => {
            if (result && result.code === 'success') {
                alert.success(result.message);
            } else {
                alert.error(result.message);
            }
        });
    }

    return (
        <div className={classNames(table_cell, column_action)}>
            <Link to={`/home-content/promo/edit/${props.row.id}`}>
                <EditIcon />
            </Link>
            <div
                className={push_notif}
                onClick={handlePushNotif}>
                <BellIcon />
            </div>
            <div
                style={{
                    position: 'relative'
                }}
            >
                <div
                    ref={moreRef}
                    onClick={handleOpenMore}
                    className={classNames(
                        more_container,
                        {[open]: isOpen}
                    )}
                >
                    <MoreIcon />
                </div>
                {isOpen &&
                    <div
                        ref={boxRef}
                        className={classNames(
                            more_box,
                            {[reverse]: props.index > props.totalRow - 2}
                        )}
                    >
                        <div
                            onClick={deletePromo}
                            className={classNames(more_text, red)}
                        >
                            {'Delete'}
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}