import React, {useRef, useState} from "react";
import {userLogin} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";

import Message from "../components/Message";

export default function Login (props) {
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

    const dispatch = useDispatch()
    const inputElement = useRef();

    const {handleOpen} = props?.dataProvider
    let defaultEmail = localStorage.getItem("D_login")
    const [email, setEmail] = useState(defaultEmail || '');
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {email, password}
        console.log(user)
        const signInResult = await dispatch(userLogin(user)).unwrap()

        console.log(signInResult)
    };

    let messageReducer = useSelector((state) => state.messageReducer.message)

    const inputEmail = (e) => {
        inputElement.current.style.border = "1px solid #ccc";
        messageReducer = ''
        if (e.target.value && !regEmail.test(e.target.value)) {
            inputElement.current.style.border = "1px solid red";
        }
        setEmail(e.target.value)
    }

    console.log(email !== '' && password !== '')
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
                    ref={inputElement}
                    defaultValue={email}
                    onChange={(e) => inputEmail(e)}
                />
                <label>Password</label>
                <input
                    type="password"
                    className="loginInput"
                    placeholder="Enter your password..."
                    onChange={(e) => setPassword(e.target.value)}
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
