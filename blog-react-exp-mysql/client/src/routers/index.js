// import BlogLayout from ""

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

const publicRoutes = [
    {
        path: '/',
        name: "home",
        id: "home",
        link: "/",
        component: Home
    },
    {
        path: '/about',
        name: "about",
        id: "about",
        link: "/about",
        component: About
    },
    {
        path: '/contact',
        name: "contact",
        id: "contact",
        link: "/contact",
        component: Contact
    },
    {
        path: '*',
        link: null,
        component: NotFound,
        layout: false
    },
    {
        path: null,
        name: "Github",
        id: "github",
        link: "https://github.com/duongp131994/blog-react",
        external: true
    },
];

export {publicRoutes}
