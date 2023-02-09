import React, { useState, useRef, useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import {register} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";

import {clearMessage, setMessage} from "../store/message";
import AuthService from "../services/auth.service";
import DInput from "./DInput";

export default function Register (props) {
    const {handleOpen} = props?.dataProvider

    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    const regPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    const messageReducer = useSelector((state) => state.messageReducer.message)
    const dispatch = useDispatch()

    const userNameElement = useRef();
    const [username, setUserName] = useState('');
    const inputUserName = (e) => {
        userNameElement.current.style.border = "1px solid #ccc";
        if (messageReducer !== '') {
            dispatch(clearMessage())
        }
        if (e.target.value && e.target.value.length < 5) {
            userNameElement.current.style.border = "1px solid red";
        }
        setUserName(e.target.value)
    }

    const emailElement = useRef();
    const [email, setEmail] = useState('');
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

    const passwordElement = useRef();
    const [password, setPassword] = useState("");
    const inputPassword = (e) => {
        e.target.style.border = "1px solid #ccc";
        if (messageReducer !== '') {
            dispatch(clearMessage())
        }
        if (e.target.value && !regPass.test(e.target.value)) {
            e.target.style.border = "1px solid red";
        }
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {username, email, password}

        try {
            const response = await AuthService.signup(user)

            console.log(response)
            if (response) {
                if (!response[0]) {
                    dispatch(setMessage(response[1]?.message))
                    return false;
                }

                localStorage.setItem("D_login", email)
                handleOpen(1)
                return true;
            }

            return false;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message)
        }
    };

    return (
        <>
            <span className="title">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <DInput typeInput={'text'} inputElement={userNameElement}
                        inputValue={username} inputClass={'registerInput'}
                        placeholder={'Enter your username...'} inputChange={inputUserName} />

                <label>Email</label>
                <DInput typeInput={'email'} inputElement={emailElement}
                        inputValue={email} inputClass={'registerInput'}
                        placeholder={'Enter your email...'} inputChange={inputEmail} />

                <label>Password</label>
                <DInput typeInput={'password'} inputElement={passwordElement}
                        inputValue={password} inputClass={'registerInput'}
                        placeholder={'Enter your password...'} inputChange={inputPassword} />

                {messageReducer !== '' && <span className={'errorMessage'}>{messageReducer}</span>}
                <button className="registerButton" type="submit">
                    Register
                </button>
                <span className="loginButton" onClick={() => {handleOpen(1)}}>Login</span>
            </form>
        </>
    );
}
