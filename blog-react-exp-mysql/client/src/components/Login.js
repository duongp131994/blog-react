import React, {useRef, useState, useEffect, useCallback, memo} from "react";
import {userLogin} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";

import {setMessage, clearMessage} from "../store/message";
import DInput from "./DInput";

const Login = (props) => {
    console.log('Login component')
    const {handleOpen} = props?.dataProvider

    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    const regPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    const dispatch = useDispatch()

    let defaultEmail = localStorage.getItem("D_login")
    const [email, setEmail] = useState(defaultEmail || '');
    const [password, setPassword] = useState("");

    let messageReducer = useSelector((state) => {
        console.log(state);
        return state.messageReducer.message
    })

    const emailElement = useRef();
    const inputEmail = useCallback((e) => {
        emailElement.current.style.border = "1px solid #ccc";
        if (messageReducer !== '') {
            dispatch(clearMessage())
        }
        if (e.target.value && !regEmail.test(e.target.value)) {
            emailElement.current.style.border = "1px solid red";
        }
        setEmail(e.target.value)
    }, [emailElement]);

    const passwordElement = useRef();
    const inputPassword = (e) => {
        passwordElement.current.style.border = "1px solid #ccc";
        if (messageReducer !== '') {
            dispatch(clearMessage())
        }
        if (e.target.value && !regPass.test(e.target.value)) {
            passwordElement.current.style.border = "1px solid red";
        }
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (regEmail.test(email) && regPass.test(password))
        {
            const user = {email, password}
            const signInResult = await dispatch(userLogin(user)).unwrap()
            console.log(signInResult)
        }
    };
    console.log(messageReducer)
    return (
        <>
            <form className="" onSubmit={handleSubmit}>
                <div>
                    <h3 className="loginTitle">Login</h3>
                </div>
                <label>Email</label>
                <DInput typeInput={'email'} inputElement={emailElement} inputValue={email} inputClass={'registerInput'} placeholder={'Enter your email...'} inputChange={inputEmail} />

                <label>Password</label>
                <DInput typeInput={'password'} inputElement={passwordElement} inputValue={password} inputClass={'loginInput'} placeholder={'Enter your password...'} inputChange={inputPassword} />

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

export default memo(Login)