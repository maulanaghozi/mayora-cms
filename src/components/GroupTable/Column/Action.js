import React, {useState, useEffect, useRef} from 'react';
import classNames from 'classnames';
import { useAlert } from 'react-alert'

import { ReactComponent as ViewIcon } from '../../../assets/eye.svg'
import { ReactComponent as MoreIcon } from '../../../assets/more_horizontal.svg'
import { Link } from 'react-router-dom';
import { replaceAndModify, replaceString } from '../../../utility/utility';

import {
    table_cell, column_action, more_container, open, more_box, more_text,
    yellow, red, reverse, more_link
} from '../GroupTable.module.scss'
import { http } from '../../../utility/http';

export default function Action(props) {
    const [isOpen, setIsOpen] = useState(false);
    const boxRef = useRef(null);
    const moreRef = useRef(null);
    const alert = useAlert();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (boxRef.current && !boxRef.current.contains(event.target) && moreRef.current && !moreRef.current.contains(event.target)) {
            setIsOpen(false);
            // props.setOpenRow(null);
        }
    }

    useEffect(() => {
        if((props.openRow !== props.index) && isOpen) {
            setIsOpen(false)
        }
    }, [props.openRow])

    const handleClick = () => {
        if(!isOpen) {
            props.setOpenRow(props.index);
        }
        setIsOpen(!isOpen);
    }

    const changeActivation = () => {
        const creator = props.row.creator
        http({
            method: 'POST',
            path: 'posting/groups/change-activation/' + props.row.id,
            data: {user_id: creator.user_id, active: props.row.active === '1' ? '0' : '1'}
        }).then(result => {
            if(result && result.code === 'success') {
                props.setKey()
                setIsOpen(false);
                props.setOpenRow(null);
            } else {
                alert.error('Update failed');
            }
        })
    }

    const deleteGroup = () => {
        const creator = props.row.creator
        http({
            method: 'DELETE',
            path: 'posting/groups/remove/' + props.row.id,
            data: {user_id: creator.user_id}
        }).then(() => {
            props.setKey()
            setIsOpen(false);
            props.setOpenRow(null);
        })
    }

    return (
        <div className={classNames(table_cell, column_action)}>
            <Link to={{
                pathname: 'group/' + replaceString(props.row.name, ' ', '-'), 
                state:{data: props.row}}}
            >
                <ViewIcon style={{cursor: 'pointer'}} />
            </Link>
            <div  style={{position: 'relative'}}>
                <div ref={moreRef} onClick={handleClick} className={classNames(more_container, (isOpen ? open : ''))}>
                    <MoreIcon />
                </div>
                {isOpen &&
                    <div ref={boxRef} className={(props.index > props.totalRow - 3) ? classNames(more_box, reverse) : more_box}>
                        <Link
                            className={more_link}
                            to={{
                                pathname: 'group/' + replaceString(props.row.name, ' ', '-'),
                                state:{ data: props.row }
                            }}
                        >
                            <div className={more_text}>Edit</div>
                        </Link>
                        <Link
                            className={more_link}
                            to={{
                                pathname: 'group/' + replaceString(props.row.name, ' ', '-') + '/view-member',
                                state: { data: props.row }
                            }}
                        >
                            <div className={more_text}>View Member</div>
                        </Link>
                        <div onClick={changeActivation} className={classNames(more_text, yellow)}>{props.row.active === '1' ? 'Deactivate': 'Activate'}</div>
                        <div onClick={deleteGroup} className={classNames(more_text, red)}>Delete</div>
                    </div>
                }
            </div>
        </div>
    )
}
