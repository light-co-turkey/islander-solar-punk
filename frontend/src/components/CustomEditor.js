import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { TextBtn } from './ui/Buttons';

const CustomEditor = (props) => {
    const { onEditorStateChange, editorState, variant, ...rest } = props

    const [more, setMore] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<>
        <div className="mbt-3 bra-1" style={{ padding: '2px', minHeight: '200px', border: "1px solid" }}>
            <Editor
                {...rest}
                editorStyle={!more && !variant ? { maxHeight: "200px" } : {}}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                placeholder="Enter description"
            />
        </div>
        {!variant ? <TextBtn className="mlra mb-2" variant="info" size="sm" onClick={() => setMore(!more)}>Show {more ? "Less" : "More"}</TextBtn> : null}
    </>
    )
}

export default CustomEditor