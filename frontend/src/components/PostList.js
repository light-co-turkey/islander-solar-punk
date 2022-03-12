import React, { useState, useEffect } from 'react';
import { LinkTextBtn, TextBtn } from './ui/Buttons';
import { useSelector, useDispatch } from "react-redux";
import { deletePost, editPost, getAllPost, setPosts, setPostsIsLoaded } from "../actions/postActions";

import Loading from "./Loading";
import { convertFromRaw, EditorState } from 'draft-js';
import Post from './Post';

const PostsList = (props) => {
  const { count } = props
  const dispatch = useDispatch()
  const post = useSelector(state => state.post)
  const auth = useSelector(state => state.auth)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (post.isLoaded) { handleMap().then(x => { setPosts(x) }) } else return dispatch(getAllPost(auth.user.id))
  }, [count, post.isLoaded]);


  let handleMap = async () => {
    if (post.isLoaded) {
      if (count === 1) {
        let promise = new Promise((resolve) => {
          resolve(
            post.posts.filter(a => a.settings.mainFeed == true)
          )
        })
        let res = await promise
        console.log("1 res", res)
        return res
      }
      else if (count === 2) {
        let promise = new Promise((resolve) => {
          resolve(post.posts.filter((a) => a.createdBy === auth.user.id)
          )
        })
        let res = await promise
        console.log("2 res", res)
        return res
      }
    }
  }

  return (
    <div>
      {!post.isLoaded ? null : /* arr.length <= 0 ? <h3 className='mt-2'>No posts yet.</h3>
        : */
        <div>
          <div className="df ai-c jc-c fw">
            {post.isLoaded ? (
              posts.map((i) => {
                const id = i._id
                const contentState = convertFromRaw(JSON.parse(i.draftJsRaw));
                const viewEditorState = EditorState.createWithContent(contentState);

                const postMeta = {
                  id: id,
                  createdAt: i.createdAt,
                  createdBy: i.createdBy
                }

                return (
                  <div key={id}>
                    <Post variant="list" isLoaded={post.isLoaded}
                      editorState={viewEditorState} postMeta={postMeta} />
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

export default PostsList