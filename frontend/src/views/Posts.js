import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPost } from '../actions/postActions';
import CreatePost from '../components/CreatePost';
import PostList from '../components/PostList';
import { ToggleSwitch, RefreshArrow } from '../components/ui/Buttons';

const Posts = props => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [count, setCount] = useState(1)

  let fieldList = [
    { text: "Main", count: 1, href: "" },
    { text: "Login to Post", href: "#/auth" }
  ]

  let fieldListAuth = [
    { text: "Main", count: 1, href: "" },
    { text: "Yours", count: 2, href: ""},
    { text: "Create", count: 3, href: "" },
  ]

  let handleRefresh = () => {
    dispatch(getAllPost(auth.user.id))
  }


  return (
    <div className="dfc ai-c" style={{ minHeight: "calc(100vh - 15rem)" }}>
      <span className='df ai-c jc-c w-100 pb-2'>
        <p className='mr-3'>Get Posts</p>
        <RefreshArrow onClick={() => handleRefresh()} fill="#00ba0c" style={{ width: "2rem" }} />
        <ToggleSwitch onSwitch={setCount} value={count} className="h-2 w-80 ml-3 mxw-400" fieldList={props.isAuthenticated ? fieldListAuth : fieldList} />
      </span>
      {count !== 1 ? null : <div className="w-100" style={{ maxWidth: "100vw" }} ><PostList count={count} /></div>}
      {count !== 2 ? null : <div className="w-100" style={{ maxWidth: "100vw" }} ><PostList count={count} /></div>}
      {count !== 3 ? null : <CreatePost setCount={setCount} />}
    </div >)
};

export default Posts;