import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faSignInAlt, faSignOutAlt, faEnvelope, faTachometerAlt, faListAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const isSignupPage = location.pathname === '/signup';
  const isLoginPage = location.pathname === '/login';
  const protectedPaths = ['/dashboard', '/categories', '/transactions', '/contact', '/expenses', '/income'];
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    const title = path.charAt(0).toUpperCase() + path.slice(1); // Capitalize first letter
    document.title = title || 'Home'; // Set document title
  }, [location]);

  useEffect(() => {
    const token = sessionStorage.getItem('x-auth-token');
    setIsLoggedIn(token ? true : false);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('x-auth-token');
    setIsLoggedIn(false);
  };

  const handleLinkClick = (event, link) => {
    if (protectedPaths.includes(location.pathname) && !protectedPaths.includes(link)) {
      const confirmed = window.confirm(`You are about to leave the current page. Do you want to proceed to ${link} page?`);
      if (!confirmed) {
        event.preventDefault();
        return;
      }
    }
  };

  const iconMap = {
    'Home': faHome,
    'Sign Up': faUserPlus,
    'Sign In': faSignInAlt,
    'Sign Out': faSignOutAlt,
    'Dashboard': faTachometerAlt,
    'Categories': faListAlt,
    'Transactions': faListAlt,
    'Contact Us': faEnvelope,
    'Hi, Le Nkap user': faUser 
  };

    return (
    <nav>
      <ul style={styles.navList}>
        <div style={styles.containerItem}>
          {(isHomePage || isSignupPage || isLoginPage) && (
            <>
              <li style={styles.navItem}>
                <NavLink
                  exact
                  to="/"
                  style={styles.link}
                  onClick={(event) => handleLinkClick(event, "Home")}
                >
                  <FontAwesomeIcon
                    icon={faHome}
                    style={{ marginRight: "6px" }}
                  />
                  Home
                </NavLink>
              </li>
              <li style={styles.navItem}>
                <NavLink
                  to="/signup"
                  style={styles.link}
                  onClick={(event) => handleLinkClick(event, "Sign Up")}
                >
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    style={{ marginRight: "6px" }}
                  />
                  Sign Up
                </NavLink>
              </li>
              <li style={styles.navItem}>
                <NavLink
                  to="/login"
                  style={styles.link}
                  onClick={(event) => handleLinkClick(event, "Sign In")}
                >
                  <FontAwesomeIcon
                    icon={faSignInAlt}
                    style={{ marginRight: "6px" }}
                  />
                  Sign In
                </NavLink>
              </li>
            </>
          )}
          {!(isHomePage || isSignupPage || isLoginPage) && (
            <div className="mt-1 flex mb-1 justify-between">
              <div className="justify-items-start">
                <li style={styles.navItem}>
                  <NavLink
                    exact
                    to="/"
                    style={styles.link}
                    onClick={(event) => handleLinkClick(event, "Home")}
                  >
                    <FontAwesomeIcon
                      icon={faHome}
                      style={{ marginRight: "6px" }}
                    />
                    Home
                  </NavLink>
                </li>
                <li style={styles.navItem}>
                  <NavLink to="/dashboard" style={styles.link}>
                    <FontAwesomeIcon
                      icon={faTachometerAlt}
                      style={{ marginRight: "6px" }}
                    />
                    Dashboard
                  </NavLink>
                </li>
                <li style={styles.navItem}>
                  <NavLink to="/categories" style={styles.link}>
                    <FontAwesomeIcon
                      icon={faListAlt}
                      style={{ marginRight: "6px" }}
                    />
                    Categories
                  </NavLink>
                </li>
                <li style={styles.navItem}>
                  <NavLink to="/transactions" style={styles.link}>
                    <FontAwesomeIcon
                      icon={faListAlt}
                      style={{ marginRight: "6px" }}
                    />
                    Transactions
                  </NavLink>
                </li>
                <li style={styles.navItem}>
                  <NavLink to="/contact" style={styles.link}>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ marginRight: "6px" }}
                    />
                    Contact Us
                  </NavLink>
                </li>
                <li style={styles.navItem}>
                  <NavLink
                    to="/login"
                    style={styles.link}
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      style={{ marginRight: "6px" }}
                    />
                    Sign Out
                  </NavLink>
                </li>
              </div>
              <div className="justify-items-end flex">
                <li style={styles.userMessage}>
                  {isLoggedIn && (
                    <span style={styles.userMessage}>
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ marginRight: "6px" }}
                      />
                      Hi, Le Nkap user
                    </span>
                  )}
                </li>
              </div>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

const styles = {
  navList: {
    listStyleType: 'none',
    margin: '0',
    padding: 0,
    overflow: 'hidden',
    backgroundColor: 'purple',
  },
  navItem: {
    display: 'inline-block',
    marginRight: '15px',
  },
  link: {
    display: 'block',
    color: 'white',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    padding: '10px',
  },
  userMessage: {
    color: 'white',
    marginRight: '10px',
    display: 'inline-block',
    marginTop: '6px',
    marginBottom: '5px'
  }
};

export default Navbar;
