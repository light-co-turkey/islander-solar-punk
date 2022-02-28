import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import axios from "axios";
import { mongoDateToHuman } from "../utils/basicUtils";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import PostMetaView from "./PostMetaView";
import { deletePost, editPost } from "../actions/postActions";
import { LinkTextBtn, TextBtn } from "./ui/Buttons";


const PostView = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const param = useSelector(state => state.param)
    const posts = useSelector(state => state.post)
    const auth = useSelector(state => state.auth)
    const [post, setPost] = useState(false);
    const [postMeta, setPostMeta] = useState(null)

    const [state, setState] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    let postId = id
    const contentStateR = e => convertFromRaw(JSON.parse(e));
    const editorStateR = e => EditorState.createWithContent(contentStateR(e));

    const getPost = () => {
        setIsLoaded(false)
        axios
            .get(`/api/posts/get_post/${postId}`)
            .then(res => {
                let data = res.data
                let newPostMeta = {
                    id: data._id,
                    createdAt: data.createdAt,
                    createdBy: data.createdBy
                }
                let editorState = editorStateR(data.draftJsRaw)
                setPostMeta(newPostMeta)
                setPost(editorState)
                setIsLoaded(true)
            })
    };

    useEffect(() => {
        getPost();
    }, []);

    let iL = !isLoaded
    const userInfo = iL ? null : postMeta.createdBy === auth.user.id

    const onEditorChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        setState({ ...state, [id]: { ...state[id], draftJsRaw: convertToRaw(contentState) } });
        setEditorState(editorState);
    }

    const onEditClick = () => {
        setState({ ...state, [id]: { id: id, edit: true, draftJsRaw: post.draftJsRaw } })
        setEditorState(post);
    }

    const handleEditPost = () => {
        let postData = { ...state[id], draftJsRaw: JSON.stringify(state[id].draftJsRaw) }
        setPost(editorStateR(postData.draftJsRaw))
        dispatch(editPost(postData))
        setState({})
    };

    return (
        <>{!isLoaded ? <Loading /> : <div className="dfc jc-c ai-c w-100 pbt-3">
            <div className="df jc-c ai-c pbt-2">
                {!userInfo ? null : <TextBtn disabled={!userInfo} variant={!state[id] ? "warning" : "info"} size="sm" onClick={() => { !state[id] ? onEditClick() : setState({}) }}>{!state[id] ? "Edit" : "Back"}</TextBtn>}
                {!state[id] ? null : <TextBtn variant="warning" className="ml-2" size="sm" disabled={!userInfo} onClick={() => { dispatch(deletePost({ id: postMeta.id, posts: posts.posts })) }}>Del</TextBtn>}
                {!state[id] ? null : (state[id].edit ? <TextBtn variant="info" size="sm" className="ml-2"
                    onClick={() => { handleEditPost() }}>Save</TextBtn> : null)}
                <PostMetaView className="ml-3" isLoaded={isLoaded} postMeta={postMeta} usersList={param.usersList} />
            </div>
            {!state[id] ?
                <div style={{ padding: '2px', minHeight: 'max-content', width: "100%" }}>
                    <Editor toolbarHidden editorState={post} readOnly={true} />
                </div>
                : <>
                    <div className="mbt-3"
                        style={{
                            border: "1px solid black", padding: '2px', minHeight: 'max-content',
                            backgroundColor: 'white', color: 'black'
                        }}>
                        {<Editor
                            editorState={editorState}
                            onEditorStateChange={onEditorChange}
                            placeholder="Enter description"
                        />}
                    </div>
                </>
            }
        </div>}</>
    );
};

export default PostView;