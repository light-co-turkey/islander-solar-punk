import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { TextBtn } from './ui/Buttons';

const CustomEditor = (props) => {
    const { onEditorStateChange, editorState, variant, ...rest } = props

    const [more, setMore] = useState(true)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let varSet = !variant ? false : variant === "list" ? true : false

    return (<>
        <div className="" style={{ padding: '2px', minWidth: "150px"}}>
            <Editor
                {...rest}
                editorStyle={!more ? {} : !varSet ? {} : { maxHeight: "100px", maxWidth: "250px" }}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                placeholder="Text goes here"
            />
            {!varSet ? null : <TextBtn className="mlra mbt-2" variant="text-info" size="sm" onClick={() => setMore(!more)}>Show {!more ? "Less" : "More"}</TextBtn>}
        </div>
    </>
    )
}

export default CustomEditor