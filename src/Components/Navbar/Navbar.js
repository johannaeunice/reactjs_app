import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleSignUpClick = (event) => {
    if (!isHomePage) {
      const confirmed = window.confirm("You are about to leave the current page. Do you want to proceed?");
      if (!confirmed) {
        event.preventDefault(); // Prevent default behavior
        return;
      }
    }
    // Add logic to handle Sign Up click
    navigate('/signup'); // Redirect to sign up page
  };

  const handleSignInClick = (event) => {
    if (!isHomePage) {
      const confirmed = window.confirm("You are about to leave the current page. Do you want to proceed?");
      if (!confirmed) {
        event.preventDefault(); // Prevent default behavior
        return;
      }
    }
    // Add logic to handle Sign In click
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav>
      <ul style={styles.navList}>
        <div style={styles.containerItem}>
          {isHomePage && (
            <li style={styles.navItem}>
              <Link to="/" style={styles.link}>Home</Link>
            </li>
          )}
          {isHomePage && (
            <li style={styles.navItem}>
              <Link to="/signup" style={styles.link} onClick={handleSignUpClick}>Sign Up</Link>
            </li>
          )}
          {isHomePage && (
            <li style={styles.navItem}>
              <Link to="/login" style={styles.link} onClick={handleSignInClick}>Sign In</Link>
            </li>
          )}
          {!isHomePage && (
            <>
              <li style={styles.navItem}>
                <Link to="/dashboard" style={styles.link}>Dashboard</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/category" style={styles.link}>Categories</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/transactions" style={styles.link}>Transactions</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/signup" style={styles.link} onClick={handleSignUpClick}>Sign Up</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/login" style={styles.link} onClick={handleSignInClick}>Sign In</Link>
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
    float: 'left',
  },
  link: {
    display: 'block',
    color: 'white',
    textAlign: 'center',
    padding: '14px 16px',
    textDecoration: 'none',
  },
  containerItem: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center'
  }
};

export default Navbar;
