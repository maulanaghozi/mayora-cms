import React, { useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { useAlert } from 'react-alert';

import {ReactComponent as FlagIcon} from '../../../assets/flag.svg'

import style from './ReportCard.module.scss';
import { http } from '../../../utility/http';
import { RedBin, BlockIcon } from '../../../assets/image';
import WarningModal from '../../WarningModal/WarningModal';

export default function ReportCard(props) {
    alert = useAlert();

    return (
        <div className={classNames(style.card_container, style[props.type])}>
            <div className={classNames(style.header, style[props.type])}>
                <Header data={props.data} />
            </div>
            <div className={classNames(style.content, style[props.type])}>
                <Content data={props.data} />
            </div>
            <div className={classNames(style.footer, style[props.type])}>
                <Footer data={props.data} type={props.type} setSearchCriteria={props.setSearchCriteria} />
            </div>
        </div>
    )
}


function Header({data}) {
    return (
        <React.Fragment>
            <div
                className={style.creator_pic}
                style={{backgroundImage: 'url(' + data.user.profile_pic_url + ')'}}
            />
            <div className={style.creator_container}>
                <div className={style.creator_name}>{data.user.name}</div>
                <div className={style.created_time}>
                    {moment.unix(data.created_at).fromNow()}
                </div>
            </div>
        </React.Fragment>
    )
}

function Content({data}) {
    return (
        <React.Fragment>
            <div className={style.flag_container}>
                <FlagIcon />
                <span className={style.content_text}>{data.flag}</span>
            </div>
            <div>
                <span className={style.content_text}>{data.description}</span>
            </div>
        </React.Fragment>
    )
}
function Footer(props) {
    const renderSmall = () => {
        let thumbnail_url;

        switch (props.data.parent_type) {
            case 'talent':
            case 'recruiter':
                thumbnail_url = props.data.parent.profile_pic_url;
                break;
            case 'group':
                thumbnail_url = props.data.parent.cover_pic_url;
                break;
            case 'profile_post':
                thumbnail_url = props.data.parent.thumbnail_url;
                break;
            case 'casting':
                thumbnail_url = props.data.parent.thumbnail.thumbnail_url;
                break;
            case 'comment':
                thumbnail_url = props.data.parent.user.profile_pic_url;
            default:
                break;
        }

        return (
            <>
                <span className={style.for_text}>for</span>
                <div
                    className={classNames(
                        style.report_pic,
                        style[props.data.parent_type]
                    )}
                    style={{backgroundImage: 'url(' + thumbnail_url + ')'}}
                />
                <span className={style.reported_type}>{props.data.parent_type.toUpperCase()}</span>
            </>
        )
    }

    const renderBig = () => {
        switch (props.data.parent_type) {
            case 'talent':
            case 'recruiter':
                return (
                    <>
                        <div className={
                            classNames(
                                style.big_footer_container,
                                style.big_footer_profile_pic_container
                            )}
                        >
                            <div
                                className={style.big_footer_profile_pic}
                                style={{
                                    backgroundImage: 'url(' + props.data.parent.profile_pic_url + ')'
                                }}
                            />
                            <div className={style.big_footer_user_name}>
                                {props.data.parent.name}
                            </div>
                        </div>
                        <Action
                            setSearchCriteria={props.setSearchCriteria}
                            data={props.data}
                            blockApi={'profiles/authentication/block/' + props.data.parent.user_id}
                        />
                    </>
                );
            case 'group':
                return (
                    <>
                        <div
                            className={style.big_footer_container}
                            style={{
                                backgroundImage: 'url(' + props.data.parent.cover_pic_url + ')'
                            }}
                        />
                        <Action
                            setSearchCriteria={props.setSearchCriteria}
                            data={props.data}
                            blockApi={'posting/group/block/' + props.data.parent.id}
                        />
                    </>
                )
            case 'profile_post':
                return (
                    <>
                        <div
                            className={style.big_footer_container}
                            style={{
                                backgroundImage: 'url(' + props.data.parent.thumbnail_url + ')'
                            }}
                        />
                        <Action
                            setSearchCriteria={props.setSearchCriteria}
                            data={props.data}
                            blockApi={'posting/profile/block/' + props.data.parent.id}
                        />
                    </>
                );
            case 'casting':
                return (
                    <>
                        <div
                            className={style.big_footer_container}
                            style={{
                                backgroundImage: 'url(' + props.data.parent.thumbnail.thumbnail_url + ')'
                            }}
                        />
                        <Action
                            setSearchCriteria={props.setSearchCriteria}
                            data={props.data}
                            blockApi={'posting/casting/block/' + props.data.parent.casting_id}
                        />
                    </>
                );
            case 'comment':
                return (
                    <>
                        <div className={style.big_footer_container}>
                            <div className={style.big_footer_comment_container}>
                                <div
                                    className={style.big_footer_comment_profile_pic}
                                    style={{
                                        backgroundImage: 'url(' + props.data.parent.user.profile_pic_url + ')'
                                    }}
                                />
                                <div className={style.big_footer_comment_text}>COMMENT</div>
                            </div>
                            <div>{props.data.parent.comment}</div>
                        </div>
                        <Action
                            setSearchCriteria={props.setSearchCriteria}
                            data={props.data}
                            blockApi={'posting/comment/block/' + props.data.parent.id}
                        />
                    </>
                );
            default:
                return (
                    <>
                        <div className={style.big_footer_container} />
                        <Action
                            setSearchCriteria={props.setSearchCriteria}
                            data={props.data}
                            blockApi={''}
                        />
                    </>
                );
        }
    }

    return (
        <React.Fragment>
            
                {
                    props.type === 'small' ?
                    renderSmall() :
                    renderBig()
                }
            
        </React.Fragment>
    )
}

function Action(props) {
    const [removeWarningState, setRemoveWarningState] = useState('closed');
    const [blockWarningState, setBlockWarningState] = useState('closed');
    const alert = useAlert();

    const openBlockWarning = () => {
        setBlockWarningState('open');
    }

    const openRemoveWarning = () => {
        setRemoveWarningState('open');
    }

    const block = () => {
        setBlockWarningState('loading');

        http({
            method: 'POST',
            path: props.blockApi
        })
        .then(result => {
            setBlockWarningState('closed');

            if (result && result.code === 'success') {
                alert.success('content has been blocked');
                props.setSearchCriteria({key: true});
            } else {
                alert.error('failed to block content');
            }
        });
    }

    const remove = () => {
        setRemoveWarningState('loading');

        http({
            method: 'DELETE',
            path: 'posting/report/remove/' + props.data.id
        })
        .then(result => {
            setRemoveWarningState('closed');

            if (result && result.code === 'success') {
                alert.success('report has been removed');
            } else {
                alert.error('failed to remove report');
            }
        });
    }

    const closeBlockWarning = () => {
        setBlockWarningState('closed');
    }
    const closeRemoveWarning = () => {
        setRemoveWarningState('closed');
    }

    return (
        <div className={style.action_container}>
            <div className={style.action_label}>
                <span className={style.action_for}>For</span>
                <span className={style.action_reported_type}>{props.data.parent_type.toUpperCase()}</span>
            </div>
            <div className={style.action_icon_container}>
                {
                    props.data.parent.status === 'blocked' ?
                    <div className={style.blocked}>BLOCKED</div> :
                    <>
                        <div onClick={openBlockWarning} className={style.action_block}>
                            <BlockIcon width={16} height={18} />
                        </div>
                        <div className={style.action_remove}>
                            <RedBin onClick={openRemoveWarning} width={14} height={16} />
                        </div>
                        {
                            (
                                blockWarningState === 'open' ||
                                blockWarningState === 'loading'
                            ) &&
                            <WarningModal
                                title={'Block List'}
                                content={'Are you sure want to block this content?'}
                                isLoading={blockWarningState === 'loading'}
                                leftOption={'Yes'}
                                leftAction={block}
                                rightOption={'No'}
                                rightAction={closeBlockWarning}
                                close={closeBlockWarning}
                            />
                        }
                        {
                            (
                                removeWarningState === 'open' ||
                                removeWarningState === 'loading'
                            ) &&
                            <WarningModal
                                title={'Remove List'}
                                content={'Are you sure want to remove this report fromo the list?'}
                                isLoading={removeWarningState === 'loading'}
                                leftOption={'Yes'}
                                leftAction={remove}
                                rightOption={'No'}
                                rightAction={closeRemoveWarning}
                                close={closeRemoveWarning}
                            />
                        }
                    </>
                }
            </div>
        </div>
    );
}