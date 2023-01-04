import React, { useRef, Component, useState, useEffect} from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios'
const API_URL = "http://localhost:3000"

const RichtextEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const uploadData = new FormData();
                uploadData.append("file", file, "file");

                axios.post(API_URL + '/api/file-upload', uploadData)
                    .then((res) => {
                        resolve({data: {link: res.data.link}});
                    })
                    .catch((err) => {reject(err)})
                    .then((res) => {
                    })
            }
        );
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    };
    const saveContent = async () => {
        let editorContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        console.log(editorContent, editorState.getCurrentContent(), 'xxxxx', draftToHtml(editorState.getCurrentContent()))
        await axios.get(API_URL + '/api/upload-content', editorContent)
            .then((res) => {
                resolve({data: {link: res.data.link}});
            })
            .catch((err) => {
                reject(err)
            })
            .then((res) => {
            })
    };
    return (
        <div className="custom-editor">
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                }}
            />
            <button onClick={saveContent}>Submit</button>
        </div>
    );
};

export default RichtextEditor;