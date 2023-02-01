import {useRef, useState} from "react";
import {userLogin} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";

import styles from "../assets/style/ComponentName.module.css";

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

    const messageReducer = useSelector((state) => state.messageReducer.message)

    const inputEmail = (e) => {
        inputElement.current.style.border = "1px solid #ccc";
        if (e.target.value && !regEmail.test(e.target.value)) {
            inputElement.current.style.border = "1px solid red";
        }
        setEmail(e.target.value)
    }

    console.log(email !== '' && password !== '')
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
                <button className="loginButton" type="submit" disabled={!(email !== '' && password !== '')}>
                    Login
                </button>
            </form>
            <button className="loginRegisterButton" onClick={() => {handleOpen(2)}}>
                Register
            </button>
            {messageReducer !== '' && <span style={{color:"red", marginTop:"10px"}}>{messageReducer}</span>}
        </div>
    );
}
