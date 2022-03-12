import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RadioInput, TextBtn } from './ui/Buttons';

import { EditorState, convertToRaw } from "draft-js";

import Loading from "./Loading";
import { submitPost } from '../actions/postActions';
import CustomEditor from './CustomEditor';
import SettingsMenager from './SettingsManager';
import { postSettings } from './constants';

const CreatePost = ({ setCount }) => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const post = useSelector(state => state.post)
    const [draftJsRaw, setDraftJsRaw] = useState(null);
    const [checks, setChecks] = useState({
        mainFeed: false,
        private: false,
        publicEdit: false
    });

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const handleChecksChange = (e) => {
        let newChecks = {
            ...checks,
            [e]: !checks[e]
        }
        setChecks(newChecks)
    }

    const onEditorChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        setDraftJsRaw(JSON.stringify(convertToRaw(contentState)));
        setEditorState(editorState);
    }

    let createdBy = auth.user.id
    let settings = checks
    const handleSubmitpost = () => {
        if (window.confirm("Are you sure!")) {
            dispatch(submitPost(createdBy, draftJsRaw, settings, setCount))
        }
    }

    return (
        <div>
            <SettingsMenager radioList={postSettings} checks={checks} handleChange={handleChecksChange} />
            <CustomEditor editorState={editorState} onEditorStateChange={onEditorChange} variant="create" />
            <TextBtn className="mt-3 mlra" size="md" variant="info" disabled={!draftJsRaw}
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