import React, { useState } from 'react';
import { convertToRaw, EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './editor.scss';

import {
    container,
    wrapper,
    editor,
    toolbar
} from './HomeWysiwyg.module.scss';

export default function HomeWysisyg({
    placeholder,
    handleDescriptionChange,
    plainDescription,
    rawDescription,
    readOnly
}) {
    let initialState;

    try {
        initialState = EditorState.createWithContent(
            convertFromRaw(rawDescription)
        )
    } catch (err) {
        initialState = EditorState.createEmpty()
    }
    const [
        editorState,
        setEditorState
    ] = useState(
        // (plainDescription && rawDescription) ?
        // EditorState.createWithContent(
        //     convertFromRaw(rawDescription)
        // ) :
        // EditorState.createEmpty()
        initialState
    );

    const handleEditorStateChange = state => {
        setEditorState(state);

        const plain = editorState.getCurrentContent().getPlainText();
        const raw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        handleDescriptionChange(plain, raw);
    }

    return (
        <div className={container}>
            <Editor
                wrapperClassName={wrapper}
                toolbarClassName={toolbar}
                editorClassName={editor}
                placeholder={placeholder}
                editorState={editorState}
                onEditorStateChange={handleEditorStateChange}
                readOnly={readOnly}
            />
        </div>
    )

}