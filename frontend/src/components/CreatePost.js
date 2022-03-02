import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch, useStore } from "react-redux";

import { Input } from './ui/Inputs';
import { TextBtn } from './ui/Buttons';

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Loading from "./Loading";
import { submitPost } from '../actions/postActions';
import { useHistory } from 'react-router-dom';

const CreatePost = x => {
    const { setCount } = x
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const post = useSelector(state => state.post)
    const [draftJsRaw, setDraftJsRaw] = useState({});

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const onEditorChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        setDraftJsRaw(JSON.stringify(convertToRaw(contentState)));
        setEditorState(editorState);
    }

    let createdBy = auth.user.id
    const handleSubmitpost = () => {
        if (window.confirm("Are you sure!")) {
            dispatch(submitPost(createdBy, draftJsRaw, setCount))
        }
    }


    return (
        <div>
            <form className="search-form dfc">
                <div className="mbt-3" style={{ padding: '2px', minHeight: '300px', backgroundColor: 'white', color: "black" }}>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorChange}
                        placeholder="Enter description"
                    />
                </div>
                <TextBtn className="mt-3 mlra" size="md" variant="info"
                    onClick={() => handleSubmitpost()}>
                    Submit
                </TextBtn>
                <div className="df w-100 jc-c p-5 mt-3">
                    {!post.isLoaded ? <Loading /> : null}
                </div>
            </form>
        </div>
    );
};

export default CreatePost;