import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleUserCheck } from "../actions/paramActions";
import { mongoDateToHuman } from "../utils/basicUtils";
import Loading from "./Loading";
import Share from "./Share";
import ViewImage from "./ViewImage";


const PostMetaView = props => {
    const { isLoaded, postMeta, className } = props;
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(null)
    const param = useSelector(state => state.param)
    let usersList = param.usersList
    let createdBy = postMeta.createdBy

    useEffect(() => {
        dispatch(handleUserCheck({ usersList, createdBy })).then(x => setUserInfo(x))
    }, []);

    return (
        <>
            {!isLoaded || !postMeta ? <Loading /> : <div className={"dfc jc-c ai-c pbt-3 " + className} style={{ padding: '2px', minHeight: 'max-content' }}>
                {!userInfo ? <p className='ml-3'>No User Data</p>
                    :
                    <div className="df jc-c ai-c w-100">
                        <span className='df ai-c'>
                            <ViewImage isLoaded={isLoaded} createdBy={createdBy} userInfo={userInfo} usageType="userPI" size="sm" />
                            <span className='dfc ai-c jc-c ml-2'><p>{userInfo.name} {userInfo.surname}</p>
                                <p>{"@" + userInfo.username}</p>
                            </span>
                        </span>
                        <p className='ml-2 f-4'>{mongoDateToHuman(postMeta.createdAt)}</p>
                    </div>}
                <Share shareUrl={"https://solarpunks.dev/#/post/" + postMeta.id} title="Sharing From SolarPunks" />
            </div>}
        </>
    );
};

export default PostMetaView;