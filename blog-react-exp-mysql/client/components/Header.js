import {Link, Route, useMatch, useResolvedPath} from 'react-router-dom'
import React from "react"
import {useSelector} from "react-redux"
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'

import {publicRoutes} from "../routers";

import Logo from "../assets/images/logo.svg";

export const Header = () => {
    return (
        <header className="main-navbar top">
            <div className="topLeft">
                <a href="/" className="logo" key="homePage">
                    <img alt="Logo" src={Logo} style={{ width: 45, height: 45, backgroundColor: 'rgb(54 32 93)', marginRight: '10px', verticalAlign: 'text-bottom' }}/>
                    Dandelions
                </a>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    {
                        publicRoutes.map((route) => {
                            if (route.link) {
                                if (!route.external) {
                                    console.log(route)
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
            <TopRight />
        </header>
    )
}

export const TopRight = () => {
    const DataUser = useSelector((state) => state.userData)

    return (
        <div className="topRight">
            {DataUser.user ? (
                <Link to="/settings">
                    <Tooltip title={DataUser.user?.username} arrow>
                        <Avatar className="topImg">{DataUser.user?.username ? DataUser.user?.username[0].toUpperCase() : '?'}</Avatar>
                    </Tooltip>
                </Link>
            ) : (
                <ul className="topList">
                    <CustomLink to="/login" className="topListItem">
                        LOGIN
                    </CustomLink>
                    <CustomLink to="/register" className="topListItem">
                        REGISTER
                    </CustomLink>
                </ul>
            )}
            <i className="topSearchIcon fas fa-search"></i>
        </div>
    )
}

const CustomLink = ({children, to, ...props}) => {
    console.log(children, to)
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