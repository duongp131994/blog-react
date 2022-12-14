import React, { useRef, useState } from 'react';
import {Editor, EditorState} from 'draft-js';

function RichtextEditor() {
    const editorRef = useRef();
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const focus = () => {
        editorRef.current.focus();
    }
// hàm focus ở đây có tác dụng khi chúng ta click
    // vào thẻ div chứa editor thì sẽ focus vào editor
    // để chúng ta cào phím lun :)
    return (
        <div className="custom-editor" onClick={focus}>
            <Editor
                ref={editorRef}
                editorState={editorState}
                onChange={setEditorState}
            />
        </div>
    );
}

export default RichtextEditor;