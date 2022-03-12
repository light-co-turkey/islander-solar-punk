import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { convertFromRaw, EditorState } from 'draft-js';
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { LinkTextBtn, TextBtn } from "./ui/Buttons";
import EditPost from "./EditPost"
import Post from "./Post"


const PostView = () => {
    const { id } = useParams();
    const param = useSelector(state => state.param)
    const posts = useSelector(state => state.post)
    const auth = useSelector(state => state.auth)
    const [post, setPost] = useState(false);
    const [postMeta, setPostMeta] = useState(null)

    const [state, setState] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

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
                    createdBy: data.createdBy,
                    settings: data.settings
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

    const onEditClick = () => {
        setState({ ...state, [id]: { id: id, edit: true, draftJsRaw: post.draftJsRaw } })
    }

    return (
        <>{!isLoaded ? <Loading /> : <div className="dfc jc-c ai-c w-100">
            <div className="df jc-c ai-c pbt-2">
                <span className="df ai-c">
                    <LinkTextBtn variant="info" href="#/" size="sm" >Back to Home</LinkTextBtn>
                    {!userInfo ? null : !state[id] ? <TextBtn className="ml-3" disabled={!userInfo} variant={!state[id] ? "warning" : "info"} size="sm" onClick={() => { !state[id] ? onEditClick() : setState({}) }}>{!state[id] ? "Edit" : "Back"}</TextBtn> : null}
                </span>
            </div>
            {!state[id] ?
                <Post isLoaded={isLoaded} editorState={post} postMeta={postMeta} variant="single"  />
                :
                <EditPost id={id} param={param} userId={auth.user.id} posts={posts} post={post} editorStateR={editorStateR} setPostMeta={setPostMeta}
                    postMeta={postMeta} isLoaded={isLoaded} setPost={setPost} userInfo={userInfo} state={state} setState={setState} />
            }
        </div>}</>
    );
};

export default PostView;