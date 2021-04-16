import React, { useState, useEffect, useRef, useContext } from 'react';
import InputText from '../InputText/InputText';
import style from './CommentViewer.module.scss';
import {http} from '../../utility/http';
import { useAlert } from 'react-alert';

import {CommentCollapse, CommentExpand, ThumbUpFill, ThumbUpOutline, ReportFlag} from '../../assets/image';
import moment from 'moment';
import Loading from '../Loading/Loading';
import { Context } from '../../hooks/context';

const commentHash = {};

export default function CommentViewer(props) {
    const [commentData, setCommentData] = useState(null);
    const [childCommentData, setChildCommentData] = useState([]);
    const [newParentComment, setNewParentComment] = useState('');
    const [newChildComment, setNewChildComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [childInputId, setChildInputId] = useState(null);
    const [childInputMention, setChildInputMention] = useState(null);
    const inputRef = useRef(null);
    const context = useContext(Context);

    const alert = useAlert();

    useEffect(() => {
        if (
            commentHash[props.casting.casting_id] &&
            typeof commentHash[props.casting.casting_id].page === 'number'
        ) {
            getParentComment();
        } else {
            commentHash[props.casting.casting_id] = {
                page: 1,
                data: props.casting
            }
            setCommentData(props.comment);
        }
    }, [])

    useEffect(() => {
        if (
            childCommentData &&
            Array.isArray(childCommentData.rows) &&
            childInputId === childCommentData.rows[0].parent_id
        ) {
            inputRef.current.focus();
        }
    }, [childCommentData])

    const toggleLike = (row, type) => {
        setLoading(true);

        const params = {}

        if (!row.liked) {
            params.method = 'PUT';
            params.path = 'posting/like/create/' + row.id
        } else {
            params.method = 'DELETE';
            params.path = 'posting/like/remove/' + row.id
        }

        http(params)
        .then(result => {
            if (result && result.code === 'success') {
                if (type === 'child') {
                    getChildComment(row.parent_id);
                } else {
                    getParentComment();
                }
            } else {
                setLoading(false);
                alert.error(result);
            }
        })
    }

    const getParentComment = () => {
        setLoading(true);

        http({
            method: 'GET',
            path: 'posting/comment/' + props.casting.casting_id,
            query: {
                page: 1,
                rows: 20 * (commentHash[props.casting.casting_id].page || 1)
            }
        })
        .then(result => {
            setLoading(false);
            if (result && result.code === 'success') {
                setCommentData(result.payload);
            } else {
                alert.error('failed to fetch comment');
            }
        })
    }

    const getChildComment = (parent_id) => {
        setLoading(true);

        if (!commentHash[parent_id]) {
            commentHash[parent_id] = {
                page: 1,
                extended: true
            }
        }

        http({
            method: 'GET',
            path: 'posting/comment/' + parent_id,
            query: {
                page: 1,
                rows: 20 * commentHash[parent_id].page
            }
        })
        .then(result => {
            if (result && result.code === 'success') {
                if (typeof commentHash[parent_id] === 'object') {
                    commentHash[parent_id].data = result.payload;
                } else {
                    commentHash[parent_id] = {
                        data: result.payload,
                        page: 1,
                        extended: true
                    }
                }
                
                setChildCommentData(result.payload);
                setLoading(false);

                // setKey(key + 1);
            } else {
                setLoading(false);
                alert.error('failed to fetch comment');
            }
        })
    }

    const submitParentComment = e => {
        if (e.which === 13) {
            setLoading(true);

            http({
                method: 'PUT',
                path: 'posting/comment/create',
                data: {
                    parent_id: props.casting.casting_id,
                    comment: newParentComment
                }
            })
            .then(result => {
                
                if (result && result.code === 'success') {
                    setNewParentComment('');
                    getParentComment();
                } else {
                    setLoading(false);
                    alert.error('failed to create comment');
                }
            })
        }
    }

    const submitChildComment = e => {
        if (e.which === 13) {
            setLoading(true);

            http({
                method: 'PUT',
                path: 'posting/comment/create',
                data: {
                    parent_id: childInputId,
                    comment: childInputMention + ' ' + newChildComment
                }
            })
            .then(result => {
                
                if (result && result.code === 'success') {
                    getChildComment(childInputId);
                    setNewChildComment('');
                    setChildInputId(null);
                } else {
                    setLoading(false);
                    alert.error('failed to create comment');
                }
            })
        }
    }

    

    const renderComment = () => {
        return commentData.rows.map(row => {
            return (
                <React.Fragment key={row.id}>
                    <CommentCard
                        row={row}
                        setLoading={setLoading}
                        getParentComment={getParentComment}
                        setChildInputMention={setChildInputMention}
                        setChildInputId={setChildInputId}
                        getChildComment={getChildComment}
                        setNewChildComment={setNewChildComment}
                        inputRef={inputRef}
                        context={context}
                        childCommentData={childCommentData}
                        setChildCommentData={setChildCommentData}
                        toggleLike={toggleLike}
                    />
                    <div className={style.comment_child_container}>
                        {
                            (
                                childCommentData &&
                                Array.isArray(childCommentData.rows) &&
                                row.id === childCommentData.rows[0].parent_id
                            ) &&
                            // commentHash[row.id].data.rows.map(row => {
                            childCommentData.rows.map(row => {
                                return (
                                    <div key={row.id} className={style.parent_comment_card} style={{width: '480px'}}>
                                    <div className={style.comment_header}>
                                        <div className={style.comment_profile}>
                                            <div
                                                className={style.outer_profile_pic}style={{
                                                    backgroundImage: 'url(' + row.user.profile_pic_url + ')'
                                                }}
                                            />
                                            <div className={style.username_container}>
                                                <div className={style.username}>{row.user.username}</div>
                                                <div className={style.created_at}>{moment.unix(row.created_at).fromNow()}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.comment_content}>{
                                        (() => {
                                            const words = row.comment.split(' ');
                                            if (words[0].charAt(0) === '@') {
                                                const mention = words.splice(0, 1);
                                                return (
                                                    <span>
                                                        <span style={{color: '#00aeef'}}>{mention + ' '}</span>
                                                        <span>{words.join(' ')}</span>
                                                    </span>
                                                )
                                            } else {
                                                return row.comment;
                                            }
                                        })()
                                    }</div>
                                    <div className={style.comment_footer}>
                                        <div
                                            className={style.comment_like}
                                            onClick={() => toggleLike(row, 'child')}
                                        >
                                            {
                                                row.liked ?
                                                <ThumbUpFill width={15} height={15} /> :
                                                <ThumbUpOutline width={15} height={15} />
                                            }
                                        </div>
                                        <div className={style.comment_like_count}>
                                            {
                                                row.like_count === 0 ?
                                                '' :
                                                (
                                                    row.like_count === 1 ?
                                                    '1 like' :
                                                    row.like_count + ' likes'
                                                ) 
                                            }
                                        </div>
                                        <div
                                            className={style.comment_reply_button}
                                            onClick={() => {
                                                if (
                                                    typeof commentHash[row.id] === 'object' &&
                                                    Object.keys(commentHash[row.id]).length > 0
                                                ) {
                                                    commentHash[row.id] = {
                                                        ...commentHash[row.id],
                                                        expanded: true
                                                    }
                                                } else {
                                                    commentHash[row.id] = {
                                                        expanded: true,
                                                        page: 1
                                                    }
                                                }
                        
                                                if (context.adminProfile.user_id !== row.user.user_id) {
                                                    setChildInputMention(row.user.username);
                                                } else {
                                                    setChildInputMention('');
                                                }
                                                setChildInputId(row.parent_id);
                        
                                                getChildComment(row.parent_id);
                        
                                                setNewChildComment('');
                                                if (inputRef.current) {
                                                    inputRef.current.focus();
                                                    // window.scrollTo(0, inputRef.current.offsetTop)  
                                                }
                                            }}
                                        >
                                            {'Reply'}
                                        </div>
                                        <div>
                                            <ReportFlag />
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                        {
                            (
                                childInputId === row.id
                            ) ?
                            <div className={style.input_child_comment_wrapper}>
                                <div
                                    className={style.outer_profile_pic}style={{
                                        backgroundImage: 'url(' + context.adminProfile.profile_pic_url + ')'
                                    }}
                                />
                                <div className={style.input_child_comment_container}>
                                    <span className={style.comment_mention}>{childInputMention}</span>
                                    <input
                                        key={row.id}
                                        ref={inputRef}
                                        className={style.input_child_comment}
                                        name={row.id}
                                        value={newChildComment}
                                        onChange={e => {setNewChildComment(e.target.value)}}
                                        onKeyPress={submitChildComment}
                                    />
                                </div>
                            </div>
                             :
                            null
                        }
                    </div>
                </React.Fragment>
            )
        })
    }
    
    return (
        <div className={style.container}>
            <InputText
                className={style.input_parent_comment}
                name={'comment'}
                value={newParentComment}
                setValue={value => {setNewParentComment(value)}}
                placeholder={'Tambah Komentar'}
                onKeyPress={submitParentComment}
            />
            {commentData ? renderComment() : <span className={style.no_comment}>{'No Comment'}</span>}
            {
                loading &&
                <div className={style.loading_container} >
                    <Loading />
                </div>
            }
        </div>
    )
}

const CommentCard = props => {
    const {row} = props;

    return (
        <div className={style.parent_comment_card}>
            <div className={style.comment_header}>
                <div className={style.comment_profile}>
                    <div
                        className={style.outer_profile_pic}style={{
                            backgroundImage: 'url(' + row.user.profile_pic_url + ')'
                        }}
                    />
                    <div className={style.username_container}>
                        <div className={style.username}>{row.user.username}</div>
                        <div className={style.created_at}>{moment.unix(row.created_at).fromNow()}</div>
                    </div>
                </div>
                {
                    (row.reply_count > 0) &&
                    <div className={style.comment_reply}>
                        <div
                            onClick={() => {
                                if (
                                    typeof commentHash[row.id] === 'object' &&
                                    Object.keys(commentHash[row.id]).length > 0
                                ) {
                                    commentHash[row.id] = {
                                        ...commentHash[row.id],
                                        expanded: !commentHash[row.id].expanded
                                    };
                                } else {
                                    commentHash[row.id] = {
                                        page: 1,
                                        expanded: true
                                    };
                                }
                                
                                if (
                                    props.childCommentData &&
                                    Array.isArray(props.childCommentData.rows) &&
                                    row.id === props.childCommentData.rows[0].parent_id
                                ) {
                                        props.setChildCommentData(null);
                                } else {
                                    props.getChildComment(row.id);
                                }

                            }}
                        >
                            {
                                (
                                    props.childCommentData &&
                                    Array.isArray(props.childCommentData.rows) &&
                                    row.id === props.childCommentData.rows[0].parent_id
                                ) ?
                                <CommentCollapse width={12} height={12} /> :
                                <CommentExpand width={12} height={12} />
                            }
                        </div>
                    </div>
                }
            </div>
            <div className={style.comment_content}>{row.comment}</div>
            <div className={style.comment_footer}>
                <div
                    className={style.comment_like}
                    onClick={() => props.toggleLike(row)}
                >
                    {
                        row.liked ?
                        <ThumbUpFill width={15} height={15} /> :
                        <ThumbUpOutline width={15} height={15} />
                    }
                </div>
                <div className={style.comment_like_count}>
                    {
                        row.like_count === 0 ?
                        '' :
                        (
                            row.like_count === 1 ?
                            '1 like' :
                            row.like_count + ' likes'
                        ) 
                    }
                </div>
                <div
                    className={style.comment_reply_button}
                    onClick={() => {
                        if (
                            typeof commentHash[row.id] === 'object' &&
                            Object.keys(commentHash[row.id]).length > 0
                        ) {
                            commentHash[row.id] = {
                                ...commentHash[row.id],
                                expanded: true
                            }
                        } else {
                            commentHash[row.id] = {
                                expanded: true,
                                page: 1
                            }
                        }

                        if (props.context.adminProfile.user_id !== row.user.user_id) {
                            props.setChildInputMention(row.user.username);
                        } else {
                            props.setChildInputMention('');
                        }
                        props.setChildInputId(row.id);

                        props.getChildComment(row.id);

                        props.setNewChildComment('');
                        if (props.inputRef.current) {
                            props.inputRef.current.focus();
                        }
                    }}
                >
                    {'Reply'}
                </div>
                <div>
                    <ReportFlag />
                </div>
            </div>
        </div>
    )
}