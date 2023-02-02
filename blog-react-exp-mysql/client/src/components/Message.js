import {useRef, useState} from "react";
import {userLogin} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";

import ListItemIcon from '@mui/material/ListItemIcon';
import CloseIcon from '@mui/icons-material/Close';
/**
 * message component
 * @param array props
 */
export default function Message({children, ...props}) {
    let messageClass = 'D_message '
    if (props.messageClass)
        messageClass += typeof props.messageClass === 'string' ? props.messageClass : props.messageClass.join(' ');

    let messageText = props.messageText || ''
    let style = {}
    style.position = props.messagePosition || 'absolute'
    style.top = props.messageTop || '10px'
    style.right = props.messageRight || '10px'

    console.log(props)
    return (
        <div className={messageClass} style={style}>
            <div>{children || (<span>{messageText}</span>)}</div>
            <CloseIcon/>
        </div>
    )
}