import {useRef, useState} from "react";
import { Link } from "react-router-dom";
import {unwrapResult} from "@reduxjs/toolkit";
import {userLogin} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";

import "../assets/style/login.css";

export default function Login() {
    const dispatch = useDispatch()
    const inputElement = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {email, password}
        const signInResult = await dispatch(userLogin(user))
        const loggedInUser = unwrapResult(signInResult);
        console.log(signInResult, loggedInUser)

        // window.location.replace("/login");
    };

    const messageReducer = useSelector((state) => state.messageReducer.message)

    const inputEmail = (e) => {
        inputElement.current.style.border = "1px solid #ccc";
        if (e.target.value && !regEmail.test(e.target.value)) {
            inputElement.current.style.border = "1px solid red";
        }
        setEmail(e.target.value)
    }

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
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
                    className="loginInput"
                    placeholder="Enter your password..."
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="loginButton" type="submit" disabled={email !== '' && password !== ''}>
                    Login
                </button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to="/register">
                    Register
                </Link>
            </button>
            {messageReducer !== '' && <span style={{color:"red", marginTop:"10px"}}>{messageReducer}</span>}
        </div>
    );
}
