import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import PostList from '../components/PostList';
import { ToggleSwitch, LinkTextBtn } from '../components/ui/Buttons';

const Posts = () => {
  const [count, setCount] = useState(1)

  let fieldList = [
    { text: "View", count: 1, href: "" },
    { text: "Create", count: 2, href: "" }
  ]

  return (
    < div className="dfc jc-c ai-c" style={{ minHeight: "calc(100vh - 15rem)"}}>
      <ToggleSwitch onSwitch={setCount} value={count} className="h-2 w-80 ml-3 mxw-400" fieldList={fieldList} />
      {count !== 1 ? null : <div className="plr-2 w-100" style={{maxWidth: "100vw"}} ><PostList /></div>}
      {count !== 2 ? null : <CreatePost />}
    </div >)
};

export default Posts;