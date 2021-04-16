import React, { useState, useEffect, useRef } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useAlert } from "react-alert";
import moment from 'moment';

import { http } from '../../../utility/http';

import BoxButton from '../../BoxButton/BoxButton';

import {
    wrapper, editor, toolbar, footer, last_updated,
    editor_container
} from './SettingsWysiwyg.module.scss';
import './editor.scss';


export default function SettingsWysiwyg(props) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [lastUpdated, setLastUpdated] = useState({at: 0, by: ''});
    const [isUpdating, setIsUpdating] = useState(false);

    const alert = useAlert();

    useEffect(() => {
        http({
            method: 'GET',
            path: 'promotion/about',
            params: props.params,
        })
        .then(result => {
            if(result && result.payload) {
                const data = result.payload[0];
                setEditorState(data.supporting_data);
                setLastUpdated({at: moment.unix(data.created_at).format('DD MMM YYYY'), by: data.creator_name})
            } else {
                if(process.env.NODE_ENV === 'development') {
                    setLastUpdated({at: '06 Jan 2020', by: 'kesting admin'})
                }
            }
        })
    }, [])

    const handleEditorStateChange = state => {
        setEditorState(state);
    }

    const handleSubmit = () => {
        setIsUpdating(true);

        http({
            method: 'POST',
            path: 'promotion/about',
            params: props.params,
            data: {
                content: editorState.getCurrentContent().getPlainText(),
                supporting_data: convertToRaw(editorState.getCurrentContent())
            },
        })
        .then(result => {
            setIsUpdating(false);

            if(result && result.code === 'success') {
                const data = result.payload[0];
                setLastUpdated({at: moment.unix(data.created_at).format('DD MMM YYYY'), by: data.creator_name});
                alert.success('update success!')
            } else {
                alert.error('update failed!')
            }
        })
    }

    return (
        <React.Fragment>
            <div className={editor_container}>
                <Editor
                    wrapperClassName={wrapper}
                    toolbarClassName={toolbar}
                    editorClassName={editor}
                    placeholder={props.placeholder}
                    editorState={editorState}
                    onEditorStateChange={handleEditorStateChange}
                />
            </div>
            <div className={footer}>
                <span className={last_updated}>{'Last updated ' + lastUpdated.at + ', by ' + lastUpdated.by}</span>
                <BoxButton text={isUpdating ? 'updating...' : 'submit'} onClick={handleSubmit} />
            </div>
        </React.Fragment>
    )
}