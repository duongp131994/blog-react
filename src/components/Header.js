import {Link, useMatch, useResolvedPath} from 'react-router-dom';

const Header = () => {
    const links = [
        {
            name: "home",
            id: "home",
            link: "/"
        },
        {
            name: "about",
            id: "about",
            link: "/about"
        },
        {
            name: "test",
            id: "test",
            link: "/test"
        },
        {
            name: "contact",
            id: "contact",
            link: "/contact"
        },
        {
            name: "Github",
            id: "github",
            link: "https://github.com/duongp131994/blog-react",
            external: true
        },
    ];

    const CustomLink = ({children, to, ...props}) => {
        const resolved = useResolvedPath(to)
        const match = useMatch({path: resolved.pathname, end: true})
        console.log(children, to, resolved, match)
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
            <a href="/" className="logo">
                Dandelions
            </a>
            <ul className="nav-menu">
                {links.map((link) => {
                    if (!link.external) {
                        return (
                            <CustomLink key={link.id} to={link.link} className="nav-link">
                                {link.name}
                            </CustomLink>
                        )
                    } else {
                        return (
                            <li key={link.id} className="nav-item">
                                <a href={link.link} className="nav-link">
                                    {link.name}
                                </a>
                            </li>
                        )
                    }}
                )}
            </ul>
        </header>
    );
};

export default Header;
