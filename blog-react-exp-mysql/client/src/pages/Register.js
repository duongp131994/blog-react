import React, { useState, useRef, useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import {register} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";

import {setMessage} from "../store/message";
import AuthService from "../services/auth.service";

export default function Register (props) {
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    const regPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    const messageReducer = useSelector((state) => state.messageReducer.message)
    const dispatch = useDispatch()
    const inputElement = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail]       = useState('');

    const {handleOpen} = props?.dataProvider

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {username, email, password}

        try {
            const response = await AuthService.signup(user);

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
    console.log(messageReducer)

    const inputEmail = (e) => {
        inputElement.current.style.border = "1px solid #ccc";
        if (e.target.value && !regEmail.test(e.target.value)) {
            inputElement.current.style.border = "1px solid red";
        }
        setEmail(e.target.value)
    }
    const inputPassword = (e) => {
        e.target.style.border = "1px solid #ccc";
        if (e.target.value && !regPass.test(e.target.value)) {
            e.target.style.border = "1px solid red";
        }
        setPassword(e.target.value)
    }
    //className="register"
    return (
        <div className="register">
            <span className="title">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    className="registerInput"
                    placeholder="Enter your username..."
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    type="email"
                    className="registerInput"
                    placeholder="Enter your email..."
                    ref={inputElement}
                    onChange={(e) => inputEmail(e)}
                />
                <label>Password</label>
                <input
                    type="password"
                    className="registerInput"
                    placeholder="Enter your password..."
                    onChange={(e) => inputPassword(e)}
                />
                <span className="loginButton" onClick={() => {handleOpen(1)}}>Login</span>
                <button className="registerButton" type="submit">
                    Register
                </button>
            </form>
            {messageReducer !== '' && <span style={{color:"red", marginTop:"10px"}}>{messageReducer}</span>}
        </div>
    );
}
