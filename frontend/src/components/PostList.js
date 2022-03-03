import React, { useState, useEffect } from 'react';
import { LinkTextBtn, TextBtn } from './ui/Buttons';
import { useSelector, useDispatch } from "react-redux";
import { deletePost, editPost, getAllPost, setPosts, setPostsIsLoaded } from "../actions/postActions";

import Loading from "./Loading";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from 'draft-js';
import PostMetaView from './PostMetaView';

const PostsList = (props) => {
  const dispatch = useDispatch()
  const post = useSelector(state => state.post)
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (post.isLoaded) { } else return dispatch(getAllPost());
  }, []);

  return (
    <div>
      {post.posts.length <= 0 ? <h3 className='mt-2'>No posts yet.</h3>
        :
        <div>
          {errorMsg && <p className="errorMsg">{errorMsg}</p>}
          <div className="dfc ai-c">
            {post.isLoaded ? (
              post.posts.map((i) => {
                const id = i._id
                const contentState = convertFromRaw(JSON.parse(i.draftJsRaw));
                const viewEditorState = EditorState.createWithContent(contentState);
                
                const postMeta = {
                  id: id,
                  createdAt: i.createdAt,
                  createdBy: i.createdBy
                }

                return (
                  <div className="dfc jc-c ai-c w-100 pbt-3" key={id}>
                    <div className="df jc-c ai-c pbt-2">
                      <LinkTextBtn className="ml-2" variant="info" href={"/#/post/" + id} size="sm">View</LinkTextBtn>
                      <PostMetaView className="ml-3" isLoaded={post.isLoaded} postMeta={postMeta} />
                    </div>
                    <div style={{ padding: '2px', minHeight: 'max-content', width: "100%" }}>
                      <Editor toolbarHidden editorState={viewEditorState} readOnly={true} />
                    </div>
                  </div>
                )
              }
              )
            ) : (
              <i className="pt-7">
                <Loading />
              </i>
            )}
          </div>
        </div>}
    </div>
  );
};

export default PostsList;