import {Link} from 'react-router-dom';

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
    return (
        <header>
            <a href="/" className="logo">
                Dandelions
            </a>
            <ul className="nav-menu">
                {links.map((link) => (
                    <li className="nav-item" key={link.id}>
                        {!link.external
                            ? <Link to={link.link} className="nav-link">
                                {link.name}
                            </Link>
                            : <a href={link.link} className="nav-link">
                                {link.name}
                            </a>
                        }
                    </li>
                ))}
            </ul>
        </header>
    );
};

export default Header;
