import React, { useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CustomEditor = props => {
    const { onEditorStateChange, editorState } = props

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="mbt-3 bra-1" style={{ padding: '2px', minHeight: '300px', borderBottom: "1px solid" }}>
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                placeholder="Enter description"
            />
        </div>
    )
}

export default CustomEditor