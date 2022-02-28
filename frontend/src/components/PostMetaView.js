import React, { useEffect, useState } from "react";
import { mongoDateToHuman } from "../utils/basicUtils";
import Loading from "./Loading";
import ViewImage from "./ViewImage";


const PostMetaView = props => {
    const [userInfo, setUserInfo] = useState(null)
    const { isLoaded, postMeta, usersList, className } = props;
    let createdBy = postMeta.createdBy

    useEffect(() => {
        setUserInfo(usersList.filter(x => x._id === createdBy)[0])
    }, [isLoaded]);

    return (
        <>
            {!isLoaded || !postMeta ? <Loading /> : <div className={"df jc-c ai-c pbt-3 " + className} style={{ padding: '2px', minHeight: 'max-content' }}>
                {!userInfo ? <p className='ml-3'>No User Data</p>
                    :
                    <div className='df ai-c'>
                        <ViewImage isLoaded={isLoaded} createdBy={createdBy} userInfo={userInfo} usageType="userPI" size="sm" />
                        <span className='dfc ai-c jc-c ml-2'><p>{userInfo.name} {userInfo.surname}</p>
                        <p>{"@" + userInfo.username}</p>
                        </span>
                    </div>}
                <p className='ml-2 f-4'>{mongoDateToHuman(postMeta.createdAt)}</p>
            </div>}
        </>
    );
};

export default PostMetaView;