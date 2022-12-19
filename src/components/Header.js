import {Link, Route, useMatch, useResolvedPath} from 'react-router-dom'
import React from "react"

import {publicRoutes} from "../routers";

import Logo from "../assets/images/logo.svg";

const Header = () => {
    const CustomLink = ({children, to, ...props}) => {
        console.log(children, to)
        const resolved = useResolvedPath(to)
        const match = useMatch({path: resolved.pathname, end: true})
        return (
            <li className={match ? 'active' : ''}>
                <Link to={to} {...props}>
                    {children}
                </Link>
            </li>
        )
    }

    return (
        <header>
            <a href="/" className="logo" key="homePage">
                <img alt="Logo" src={Logo} style={{ width: 45, height: 45, backgroundColor: 'rgb(54 32 93)', marginRight: '10px', verticalAlign: 'text-bottom' }}/>
                Dandelions
            </a>
            <ul className="nav-menu">
                {
                    publicRoutes.map((route) => {
                        if (route.link) {
                            if (!route.external) {
                                console.log(route)
                                return (
                                    <CustomLink key={route.id} to={route.link} className="nav-link">
                                        {route.name}
                                    </CustomLink>
                                )
                            } else {
                                return (
                                    <li key={route.id} className="nav-item">
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
        </header>
    );
};

export default Header;
