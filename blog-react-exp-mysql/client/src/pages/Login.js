import React, {useRef, useState, useEffect, useCallback} from "react";
import {userLogin} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";

import {setMessage, clearMessage} from "../store/message";
import DInput from "../components/DInput";

export default function Login (props) {
    console.log('Login component')

    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

    const dispatch = useDispatch()
    const emailElement = useRef();

    const {handleOpen} = props?.dataProvider
    let defaultEmail = localStorage.getItem("D_login")
    const [email, setEmail] = useState(defaultEmail || '');
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {email, password}
        const signInResult = await dispatch(userLogin(user)).unwrap()

        console.log(signInResult)
    };
        // useEffect(() => {
    let messageReducer = useSelector((state) => {
        console.log(state);
        return state.messageReducer.message
    })
    // }, []);

    const inputEmail = (e) => {
        emailElement.current.style.border = "1px solid #ccc";
        if (messageReducer !== '') {
            dispatch(clearMessage())
        }
        if (e.target.value && !regEmail.test(e.target.value)) {
            emailElement.current.style.border = "1px solid red";
        }
        setEmail(e.target.value)
    }

    const inputElement = useRef();
    const inputEvent = useCallback((e) => {
        console.log(inputElement)
        console.log(e, e.target.value)
        inputElement.current.style.border = "1px solid red";
    }, [inputElement]);

    const inputPassword = (e) => {
        // inputElement.current.style.border = "1px solid #ccc";
        if (messageReducer !== '') {
            dispatch(clearMessage())
        }
        // if (e.target.value && !regEmail.test(e.target.value)) {
        //     inputElement.current.style.border = "1px solid red";
        // }
        setPassword(e.target.value)
    }

    console.log(messageReducer)
    return (
        <>
            <form className="" onSubmit={handleSubmit}>
                <div>
                    <h3 className="loginTitle">Login</h3>
                </div>
                <label>Email</label>
                <input
                    type="email"
                    className="registerInput"
                    placeholder="Enter your email..."
                    ref={emailElement}
                    defaultValue={email}
                    onChange={(e) => inputEmail(e)}
                />
                <DInput typeInput={'email'} inputElement={inputElement} inputValue={email} inputClass={'registerInput'} placeholder={'Enter your email...'} inputChange={inputEvent} />
                <label>Password</label>
                <input
                    type="password"
                    className="loginInput"
                    placeholder="Enter your password..."
                    onChange={(e) => inputPassword(e)}
                />
                {messageReducer !== '' && <span className={'errorMessage'}>{messageReducer}</span>}
                <button className="loginButton" type="submit" disabled={!(email !== '' && password !== '')}>
                    Login
                </button>
                <span className="registerButton" onClick={() => {handleOpen(2)}}>Not a member? <ins style={{cursor: 'pointer'}}>Register</ins></span>
            </form>
            {/*{messageReducer !== '' && <Message messagePosition={'fixed'} messageClass={'error_log'}><span>{messageReducer}</span></Message>}*/}
        </>
    );
}
