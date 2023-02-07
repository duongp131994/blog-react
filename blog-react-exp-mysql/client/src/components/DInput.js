import React, {useRef, useState} from "react";
import {userLogin} from "../store/userSlice";

/**
 * message component
 * @param array props
 */
export default function DInput({children, ...props}) {
    const [inputValue, setInputValue] = useState(props.inputValue || '');
    const inputElement = useRef();

    let inputClass = 'D_input_class '
    if (props.inputClass)
        inputClass += typeof props.inputClass === 'string' ? props.inputClass : props.inputClass.join(' ');

    let placeholder = 'Enter your password...'
    if (props.placeholder)
        placeholder = props.placeholder;

    const inputChange = async (e) => {
        e.preventDefault();
        const user = {email, password}
        const signInResult = await dispatch(userLogin(user)).unwrap()

        console.log(signInResult)
    };

    return (
        <>
            <input
                type="password"
                className={inputClass}
                placeholder={placeholder}
                onChange={(e) => setInputValue(e.target.value)}
                defaultValue={inputValue}
                ref={inputElement}
                onChange={(e) => inputChange(e)}
            />
        </>
        <div className={inputClass} style={style}>
            <div>{children || (<span>{messageText}</span>)}</div>
        </div>
    )
}