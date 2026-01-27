export default function Navbar({ brand, aboutHref }) {
    return (
        <header className="navbar">
            <nav className="navbar__inner">
                <div className="navbar__brand">
                    <div className="navbar__icon" aria-hidden="true">
                        ⚙
                    </div>
                    <span className="navbar__text">{brand}</span>
                </div>

                <a className="navbar__link" href={aboutHref}>
                    About
                </a>
            </nav>
        </header>
    );
}