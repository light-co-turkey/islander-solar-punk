import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { useDispatch } from "react-redux";
import Loading from "./Loading";
import PostMetaView from "./PostMetaView";
import { deletePost, editPost } from "../actions/postActions";
import { TextBtn } from "./ui/Buttons";
import CustomEditor from "./CustomEditor";
import SettingsMenager from "./SettingsManager";
import { postSettings } from "./constants";


const EditPost = props => {
    const { id, param, posts, post, postMeta, isLoaded, setPost, userInfo, userId, state, setState, onEditClick, editorStateR, setPostMeta } = props
    const dispatch = useDispatch()
    const history = useHistory();
    const [checks, setChecks] = useState({});

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

    useEffect(() => {
        const contentState = post.getCurrentContent();
        setState({ ...state, [id]: { ...state[id], draftJsRaw: convertToRaw(contentState) } });
        setChecks(postMeta.settings)
        setEditorState(post)
    }, []);


    const onEditorChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        setState({ ...state, [id]: { ...state[id], draftJsRaw: convertToRaw(contentState) } });
        setEditorState(editorState);
    }

    const handleEditPost = () => {
        let postData = { ...state[id], draftJsRaw: JSON.stringify(state[id].draftJsRaw), settings: checks, userId: userId }
        if (window.confirm("Are you sure?")) {
            setPost(editorStateR(postData.draftJsRaw))
            dispatch(editPost(postData))
            setPostMeta({...postMeta, settings: checks})
            setState({})
        }
    };

    const handleDelPost = () => {
        let list = posts.posts
        if (window.confirm("Are you sure?")) {
            dispatch(deletePost(id, list, history))
        }
    }

    return (
        <>{!isLoaded ? <Loading /> : <div className="dfc jc-c ai-c w-100">
            <div className="df jc-c ai-c pbt-2">
                <span className="dfc ai-c">
                    <TextBtn disabled={!userInfo} variant={!state[id] ? "warning" : "info"} size="sm" onClick={() => { !state[id] ? onEditClick() : setState({}) }}>{!state[id] ? "Edit" : "Back"}</TextBtn>
                    {!state[id] ? null : <TextBtn variant="warning" className="mt-2" size="sm" disabled={!userInfo} onClick={() => handleDelPost()}>Del</TextBtn>}
                    {!state[id] ? null : (state[id].edit ? <TextBtn variant="info" size="sm" className="mt-2"
                        disabled={!state[id].draftJsRaw} onClick={() => { handleEditPost() }}>Save</TextBtn> : null)}
                </span>
                <PostMetaView className="ml-3" isLoaded={isLoaded} postMeta={postMeta} usersList={param.usersList} />
            </div>
            <SettingsMenager radioList={postSettings} checks={checks} handleChange={handleChecksChange} />
            <CustomEditor editorState={editorState} onEditorStateChange={onEditorChange} variant="edit" />
        </div>}</>
    );
}

export default EditPost;