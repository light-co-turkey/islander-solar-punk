import React, { useState, useEffect } from 'react';
import { LinkTextBtn, TextBtn } from './ui/Buttons';
import { useSelector, useDispatch } from "react-redux";
import { deletePost, editPost, getAllPost, setPosts, setPostsIsLoaded } from "../actions/postActions";

import Loading from "./Loading";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from 'draft-js';
import PostMetaView from './PostMetaView';
import CustomEditor from './CustomEditor';

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
          <div className="df ai-c jc-c fw">
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
                  <div className="dfc jc-c ai-c bra-1 b-i mt-2 m-2 p-1" key={id}>
                    <div className="df jc-c ai-c bb-1 pb-2">
                      <PostMetaView isLoaded={post.isLoaded} postMeta={postMeta} />
                    </div>
                    <CustomEditor toolbarHidden editorState={viewEditorState} readOnly={true} variant="list" />
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