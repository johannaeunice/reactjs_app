import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('');
  const isHomePage = location.pathname === '/';

  // Update document title based on current location
  useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    const title = path.charAt(0).toUpperCase() + path.slice(1); // Capitalize first letter
    document.title = title || 'Home'; // Set document title
  }, [location]);

  // Handle navigation link clicks
  const handleLinkClick = (event, link) => {
    // Confirm navigation for certain links if not on home page
    if (!isHomePage && ['/signup', '/login'].includes(link)) {
      const confirmed = window.confirm(`You are about to leave the current page. Do you want to proceed to ${link}?`);
      if (!confirmed) {
        event.preventDefault(); // Prevent default behavior
        return;
      }
    }
    // Logout user by removing the x-auth-token
    sessionStorage.removeItem('x-auth-token');
    setActiveLink(link);
  };

  // Handle dropdown option click
  const handleDropdownOptionClick = (path) => {
    navigate(path);
    setActiveLink('Transactions'); // Assuming 'Transactions' is the main link
  };

  return (
    <nav>
      <ul style={styles.navList}>
        <div style={styles.containerItem}>
          {isHomePage && (
            <>
              {/* Home link */}
              <li style={styles.navItem}>
                <NavLink exact to="/" style={styles.link} onClick={(event) => handleLinkClick(event, 'Home')} activeStyle={activeLink === 'Home' ? styles.activeLink : null}>Home</NavLink>
              </li>
              {/* Signup link */}
              <li style={styles.navItem}>
                <NavLink to="/signup" style={styles.link} onClick={(event) => handleLinkClick(event, 'Sign Up')} activeStyle={activeLink === 'Sign Up' ? styles.activeLink : null}>Sign Up</NavLink>
              </li>
              {/* Login link */}
              <li style={styles.navItem}>
                <NavLink to="/login" style={styles.link} onClick={(event) => handleLinkClick(event, 'Sign In')} activeStyle={activeLink === 'Sign In' ? styles.activeLink : null}>Sign In</NavLink>
              </li>
            </>
          )}
          {/* If not on home page */}
          {!isHomePage && (
            <>
              {/* Home link */}
              <li style={styles.navItem}>
                <NavLink exact to="/" style={styles.link} onClick={handleLinkClick} activeStyle={activeLink === 'Home' ? styles.activeLink : null}>Home</NavLink>
              </li>
              {/* Dashboard link */}
              <li style={styles.navItem}>
                <NavLink to="/dashboard" style={styles.link} activeStyle={activeLink === 'Dashboard' ? styles.activeLink : null}>Dashboard</NavLink>
              </li>
              {/* Categories link */}
              <li style={styles.navItem}>
                <NavLink to="/categories" style={styles.link} activeStyle={activeLink === 'Category' ? styles.activeLink : null}>Categories</NavLink>
              </li>
              {/* Transactions dropdown */}
              <li style={styles.navItem}>
                <div style={styles.dropdown}>
                  <button className="text-white" style={styles.link} onClick={() => handleDropdownOptionClick('/transactions')}>Transactions</button>
                  <div style={styles.dropdownContent}>
                    <NavLink to="/transactions" style={styles.dropdownLink} onClick={() => handleDropdownOptionClick('/transactions')} activeClassName="font-bold">Transactions</NavLink>
                    <NavLink to="/income" style={styles.dropdownLink} onClick={() => handleDropdownOptionClick('/income')} activeClassName="font-bold">Income</NavLink>
                    <NavLink to="/expenses" style={styles.dropdownLink} onClick={() => handleDropdownOptionClick('/expenses')} activeClassName="font-bold">Expenses</NavLink>
                  </div>
                </div>
              </li>
              {/* Contact Us link */}
              <li style={styles.navItem}>
                <NavLink to="/contact" style={styles.link} activeStyle={activeLink === 'Contact Us' ? styles.activeLink : null}>Contact Us</NavLink>
              </li>
              {/* Signup link */}
              <li style={styles.navItem}>
                <NavLink to="/signup" style={styles.link} onClick={handleLinkClick} activeStyle={activeLink === 'Sign Up' ? styles.activeLink : null}>Sign Up</NavLink>
              </li>
              {/* Login link */}
              <li style={styles.navItem}>
                <NavLink to="/login" style={styles.link} onClick={handleLinkClick} activeStyle={activeLink === 'Sign In' ? styles.activeLink : null}>Sign In</NavLink>
              </li>
            </>
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
  activeLink: {
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  dropdown: {
    position: 'relative',
    display: 'inline-block',
  },
  dropdownContent: {
    display: 'none',
    position: 'absolute',
    backgroundColor: '#f9f9f9',
    minWidth: '160px',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: '1',
  },
  dropdownLink: {
    color: 'black',
    padding: '12px 16px',
    textDecoration: 'none',
    display: 'block',
    transition: 'background-color 0.3s ease',
  }
};

export default Navbar;
