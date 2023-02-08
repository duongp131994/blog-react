import React, {memo, useRef, useState} from "react";
import {userLogin} from "../store/userSlice";

/**
 * message component
 * @param array props
 */
const DInput = ({children, ...props}) => {
    const [inputValue, setInputValue] = useState(props.inputValue || '');

    let inputClass = 'D_input_class '
    if (props.inputClass)
        inputClass += typeof props.inputClass === 'string' ? props.inputClass : props.inputClass.join(' ');

    let inputElement
    if (props.inputElement) {
        inputElement = props.inputElement;
    } else {
        inputElement = useRef();
    }

    let placeholder = 'Enter your password...'
    if (props.placeholder)
        placeholder = props.placeholder;

    const inputChange = (e) => {
        e.preventDefault();

        setInputValue(e.target.value)

        if (props.inputChange) {
            props.inputChange(e)
        }
    };

    return (
        <>
            <input
                type={props.typeInput || "text"}
                className={inputClass}
                placeholder={placeholder}
                value={inputValue}
                ref={inputElement}
                onChange={(e) => inputChange(e)}
            />
            {children}
        </>
    )
}

export default memo(DInput);