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

    let varSet = !variant ? false : variant === "list" || variant === "single" ? true : false

    let editorStyle = {
        ...(!more ? { minHeight: "200px" } : !varSet ? { minHeight: "200px" } : { maxHeight: "50px", maxWidth: "250px" }),
        ...(varSet ? {} : { border: "1px solid", maxHeight: "370px" })
    }

    return (<>
        <div className="" style={{ padding: '2px', minWidth: "150px" }}>
            {!varSet ? null : <TextBtn className="mlra" variant="text-info" size="sm" onClick={() => setMore(!more)}>Show {!more ? "Less" : "More"}</TextBtn>}
            <Editor
                {...rest}
                editorStyle={editorStyle}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                placeholder="Text goes here"
            />
        </div>
    </>
    )
}

export default CustomEditor