import React, { useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { useAlert } from 'react-alert';

import {ReactComponent as RemoveIcon} from '../../../assets/trash_2.svg'

import {
    card_container, card_header, card_content,
    card_action, card_profile, card_status,
    card_creation_time, solved, content_wrapper,
    pp_container, profile_picture, full_name
} from './HelpCard.module.scss';
import { http } from '../../../utility/http';

export default function HelpCard(props) {
    const [isRemoving, setIsRemoving] = useState(false);
    const [isSolving, setIsSolving] = useState(false);
    const [replayPageIsOpen, setReplayPageIsOpen] = useState(false);

    const alert = useAlert();
    const handleRemove = () => {
        setIsRemoving(true);
        http({
            method: 'DELETE',
            path: 'promotion/ticket/' + props.data.id
        })
        .then(result => {
            setIsRemoving(false);
            if(result && result.code === 'success') {
                alert.success('done!');
            } else {
                alert.error('failed!');
            }
        })
    }

    const handleSolve = () => {
        setIsSolving(true);
        http({
            method: 'POST',
            path: 'promotion/ticket/' + props.data.id
        })
        .then(result => {
            if(result && result.code === 'success') {
                alert.success('done!');
            } else {
                alert.error('failed!')
            }
        })
    }

    const handleReplay = () => {
        setReplayPageIsOpen(true);
    }

    return (
        <div className={card_container}>
            <div className={content_wrapper}>
                <div className={card_header}>
                    <div className={classNames(
                        card_status,
                        {[solved]: props.data.status === 'closed'}
                    )}>
                        {props.data.status === 'closed' ? 'SOLVED' : 'UNSOLVED'}
                    </div>
                    <div className={card_creation_time}>
                        {
                            (() => {
                                let time = moment().diff(moment.unix(props.data.created_at), 'years');
                                let desc = 'years ago';
                                if(!time) {
                                    time = moment().diff(moment.unix(props.data.created_at), 'months');
                                    desc = 'months ago';

                                    if(!time) {
                                        time = moment().diff(moment.unix(props.data.created_at), 'days');
                                        desc = 'days ago';

                                        if(!time) {
                                            time = moment().diff(moment.unix(props.data.created_at), 'hours');
                                            desc = 'hours ago';

                                            if(!time) {
                                                time = moment().diff(moment.unix(props.data.created_at), 'minutes');
                                                desc = 'minutes ago';
                                            }
                                        }
                                    }
                                }
                                return time + ' ' + desc;
                            })()
                        }
                    </div>
                </div>
                <div className={card_content}>
                    {props.data.content}
                </div>
            </div>
            <div className={card_action}>
                <button onClick={handleReplay}>REPLAY</button>
                <button onClick={handleSolve}>SOLVE</button> 
                <RemoveIcon onClick={handleRemove} />
            </div>
            <div className={card_profile}>
                <div className={pp_container}>
                    <img className={profile_picture} src={props.data.profile_pic}></img>
                </div>
                <div className={full_name}>{props.data.user_full_name}</div>
            </div>
        </div>
    )
}
