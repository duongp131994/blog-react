import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import {register} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";

import "../assets/style/register.css";

export default function Register() {
    const messageReducer = useSelector((state) => state.messageReducer.message)
    const dispatch = useDispatch()
    const inputElement = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    const regPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {username, email, password}
        const signInResult = await dispatch(register(user))
        const loggedInUser = unwrapResult(signInResult);
        console.log(signInResult, loggedInUser)

        // window.location.replace("/login");
    };
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
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
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
                <span onClick={}>Login</span>
                <button className="registerButton" type="submit">
                    Register
                </button>
            </form>
            {messageReducer !== '' && <span style={{color:"red", marginTop:"10px"}}>{messageReducer}</span>}
        </div>
    );
}
