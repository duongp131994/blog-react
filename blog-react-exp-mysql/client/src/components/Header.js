import {Link, Route, useMatch, useResolvedPath} from 'react-router-dom'
import React, {createContext, useContext} from "react"
import {useSelector} from "react-redux"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import {publicRoutes} from "../routers";
import Register from "../components/Register";
import Login from "../components/Login";
import {UserMenuPopper} from './Tooltip'
import Logo from "../assets/images/logo.svg";

export const TopRight = () => {
    const DataUser = useSelector((state) => state.userData)

    const [loginRegister, setLoginRegister] = React.useState(0);
    const handleOpen = (data) => {
        console.log(data)
        setLoginRegister(data)
    }
    const handleClose = () => {
        setLoginRegister(0);
    }

    const dataProvider = {handleOpen};
    console.log(DataUser, DataUser.user)
    return (
        <div className="topRight">
            {DataUser.isLoggedIn ? (
                <div className="topList">
                    <UserMenuPopper dataUser={DataUser} />
                </div>
            ) : (
                <div className="topList">
                    <div>
                        <Button onClick={() => handleOpen(1)}>LOGIN</Button>
                        <Button onClick={() => handleOpen(2)}>REGISTER</Button>
                        <Modal
                            open={loginRegister > 0}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <>
                            {loginRegister === 1 && (<Box className={'D_modal auth_popup loginForm'}><Login dataProvider={dataProvider}/></Box>)}
                            {loginRegister === 2 && (<Box className={'D_modal auth_popup register'}><Register dataProvider={dataProvider}/></Box>)}
                            </>
                        </Modal>
                    </div>
                </div>
            )}
            <i className="topSearchIcon fas fa-search"></i>
        </div>
    )
}

const CustomLink = ({children, to, ...props}) => {
    const resolved = useResolvedPath(to)
    const match = useMatch({path: resolved.pathname, end: true})
    return (
        <li className={match ? 'active' : ''}>
            <Link className="link" to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export const Header = () => {
    return (
        <header className="main-navbar top aaa">
            <div className="topLeft">
                <a href="/" className="logo" key="homePage">
                    <img alt="Logo" src={Logo} style={{
                        width: 45,
                        height: 45,
                        backgroundColor: 'rgb(54 32 93)',
                        marginRight: '10px',
                        verticalAlign: 'text-bottom'
                    }}/>
                    Dandelionss
                </a>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    {
                        publicRoutes.map((route) => {
                            if (route.link) {
                                if (!route.external) {
                                    return (
                                        <CustomLink key={route.id} to={route.link} className="nav-link topListItem">
                                            {route.name}
                                        </CustomLink>
                                    )
                                } else {
                                    return (
                                        <li key={route.id} className="nav-item topListItem">
                                            <a href={route.link} className="nav-link">
                                                {route.name}
                                            </a>
                                        </li>
                                    )
                                }
                            }
                        })
                    }
                </ul>
            </div>
            <TopRight/>
        </header>
    )
}
