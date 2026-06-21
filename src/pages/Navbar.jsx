import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home', external: false },
  { to: '/trackprotein', label: 'Track Protein', external: false },
  { to: '/exercises', label: 'Exercises', external: false },
  { to: '/planner', label: 'Planner', external: false },
  {
    to: 'https://snackable-jokes-production.up.railway.app/',
    label: 'Laugh Bites',
    external: true,
  },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('nav-menu-open', menuOpen);
    return () => document.body.classList.remove('nav-menu-open');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand" onClick={closeMenu}>
        <span className="logo">TrainWithNish</span>
      </Link>

      <button
        type="button"
        className={`nav-toggle ${menuOpen ? 'is-open' : ''}`}
        aria-expanded={menuOpen}
        aria-controls="main-nav"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>

      {menuOpen ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}

      <nav id="main-nav" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
        {NAV_LINKS.map(({ to, label, external }) =>
          external ? (
            <a key={to} href={to} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
              {label}
            </a>
          ) : (
            <Link key={to} to={to} onClick={closeMenu}>
              {label}
            </Link>
          )
        )}
      </nav>
    </header>
  );
}

export default Navbar;
