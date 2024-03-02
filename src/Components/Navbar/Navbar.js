import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const protectedPaths = ['/dashboard', '/categories', '/transactions', '/contact', '/expenses', '/income'];

  // Update document title based on current location
  useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    const title = path.charAt(0).toUpperCase() + path.slice(1); // Capitalize first letter
    document.title = title || 'Home'; // Set document title
  }, [location]);

  // Handle navigation link clicks
  const handleLinkClick = (event, link) => {
    // Check if user is on protected page and wants to navigate away
    if (protectedPaths.includes(location.pathname) && !protectedPaths.includes(link)) {
      const confirmed = window.confirm(`You are about to leave the current page. Do you want to proceed to ${link} page?`);
      if (!confirmed) {
        event.preventDefault(); // Prevent default behavior
        return;
      }
    }

    // Logout user by removing the x-auth-token
    sessionStorage.removeItem('x-auth-token');
  };

  return (
    <nav>
      <ul style={styles.navList}>
        <div style={styles.containerItem}>
          {isHomePage && (
            <>
              {/* Home link */}
              <li style={styles.navItem}>
                <NavLink exact to="/" style={styles.link} onClick={(event) => handleLinkClick(event, 'Home')}>Home</NavLink>
              </li>
              {/* Signup link */}
              <li style={styles.navItem}>
                <NavLink to="/signup" style={styles.link} onClick={(event) => handleLinkClick(event, 'Sign Up')}>Sign Up</NavLink>
              </li>
              {/* Login link */}
              <li style={styles.navItem}>
                <NavLink to="/login" style={styles.link} onClick={(event) => handleLinkClick(event, 'Sign In')}>Sign In</NavLink>
              </li>
              <li style={styles.navItem}>
                <NavLink to="/contact" style={styles.link} onClick={(event) => handleLinkClick(event, 'Contact Us')}>Contact Us</NavLink>
              </li>
            </>
          )}
          {/* If not on home page */}
          {!isHomePage && (
            <>
              {/* Home link */}
              <li style={styles.navItem}>
                <NavLink exact to="/" style={styles.link} onClick={(event) => handleLinkClick(event, 'Home')}>Home</NavLink>
              </li>
              {/* Dashboard link */}
              <li style={styles.navItem}>
                <NavLink to="/dashboard" style={styles.link}>Dashboard</NavLink>
              </li>
              {/* Categories link */}
              <li style={styles.navItem}>
                <NavLink to="/categories" style={styles.link}>Categories</NavLink>
              </li>
              {/* Transactions link */}
              <li style={styles.navItem}>
                <NavLink to="/transactions" style={styles.link}>Transactions</NavLink>
              </li>
              {/* Contact Us link */}
              <li style={styles.navItem}>
                <NavLink to="/contact" style={styles.link}>Contact Us</NavLink>
              </li>
              {/* Signup link */}
              <li style={styles.navItem}>
                <NavLink to="/signup" style={styles.link} onClick={(event) => handleLinkClick(event, 'Sign Up')}>Sign Up</NavLink>
              </li>
              {/* Login link */}
              <li style={styles.navItem}>
                <NavLink to="/login" style={styles.link} onClick={(event) => handleLinkClick(event, 'Sign In')}>Sign In</NavLink>
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
  }
};

export default Navbar;
