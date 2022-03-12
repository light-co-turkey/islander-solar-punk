import React, { useEffect } from 'react';
import CustomEditor from './CustomEditor';
import PostMetaView from './PostMetaView';

const Post = props => {
    const { isLoaded, postMeta, editorState, variant } = props

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="dfc jc-c ai-c bra-1 b-i mt-2 m-2 p-1">
            <div className="df jc-c ai-c bb-1 pb-2">
                <PostMetaView isLoaded={isLoaded} postMeta={postMeta} />
            </div>
            <CustomEditor toolbarHidden editorState={editorState} readOnly={true} variant={variant} />
        </div>
    )
}

export default Post