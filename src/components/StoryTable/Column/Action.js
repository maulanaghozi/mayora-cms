import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { http } from '../../../utility/http';

import { ReactComponent as ViewIcon } from '../../../assets/eye.svg';
import { ReactComponent as MoreIcon } from '../../../assets/more_horizontal.svg';
import { ReactComponent as EditIcon } from '../../../assets/edit.svg';
import ContentViewer from '../../../components/ContentViewer';

import style from '../StoryTable.module.scss';

export default function Action(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const boxRef = useRef(null);
    const moreRef = useRef(null);
    const alert = useAlert();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleClickOutside = (event) => {
        if (boxRef.current && !boxRef.current.contains(event.target) && moreRef.current && !moreRef.current.contains(event.target)) {
            setIsOpen(false)
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

    const changeNotification = () => {
        setIsOpen(false)
        props.setOpenRow(null)
        alert.success('Push Notivication Success')
    }

    const deleteStory = () => {
        http({
            method: 'DELETE',
            path: 'promotion/story/' + props.row.id
        }).then(result => {
            if (result && result.code === 'success') {
                setIsOpen(false);
                props.setOpenRow(null);
                props.setKey();
            } else {
                alert.error('failed to delete story')
            }
        })
    }

    const openViewer = () => {
        setViewerIsOpen(true);
    }

    return (
        <div className={classNames(style.table_cell, style.column_action)}>
            <div className={style.view_story} onClick={openViewer}><ViewIcon /></div>
            <Link to={`/home-content/stories/edit/${props.row.id}`}><EditIcon /></Link>
            <div style={{ position: 'relative' }}>
                <div ref={moreRef} onClick={handleClick} className={classNames(style.more_container, {[style.open]: isOpen})}>
                    <MoreIcon />
                </div>
                {isOpen &&
                    <div ref={boxRef} className={classNames(style.more_box, {[style.reverse]: props.index > props.totalRow - 3})}>
                        <div onClick={changeNotification} className={classNames(style.more_text, style.yellow)}>Push Notification</div>
                        <div onClick={deleteStory} className={classNames(style.more_text, style.red)}>Delete</div>
                    </div>
                }
            </div>
            {
                viewerIsOpen &&
                <ContentViewer
                    index={props.index}
                    content={props.data.map(story => story.video_url)}
                    setShow={setViewerIsOpen}
                />
            }
        </div >
    )
}