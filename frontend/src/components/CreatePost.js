import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { TextBtn } from './ui/Buttons';

import { EditorState, convertToRaw } from "draft-js";

import Loading from "./Loading";
import { submitPost } from '../actions/postActions';
import CustomEditor from './CustomEditor';

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
            <CustomEditor editorState={editorState} onEditorStateChange={onEditorChange} />
            <TextBtn className="mt-3 mlra" size="md" variant="info"
                onClick={() => handleSubmitpost()}>
                Submit
            </TextBtn>
            <div className="df w-100 jc-c p-5 mt-3">
                {!post.isLoaded ? <Loading /> : null}
            </div>
        </div>
    );
};

export default CreatePost;