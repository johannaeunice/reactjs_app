import React, {useState} from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('')
  const isHomePage = location.pathname === '/';

  const handleHomeClick = (event) => {
    if (!isHomePage) {
      const confirmed = window.confirm("You are about to leave the current page. Do you want to proceed?");
      if (!confirmed) {
        event.preventDefault(); // Prevent default behavior
        return;
      }
    }
    // Redirect to home page ("/")
    navigate('/');
  };

  const handleSignUpClick = (event) => {
    const confirmed = window.confirm("You are about to leave the current page.You will be logged out. Do you want to proceed?");
    if (!confirmed) {
      event.preventDefault(); // Prevent default behavior
    }else {
      // Logout user by removing the x-auth-token
      sessionStorage.removeItem('x-auth-token');
      // Redirect to signup page
    navigate('/signup');
    setActiveLink('Sign Up');
    }
  };

  const handleSignInClick = (event) => {
    const confirmed = window.confirm("You are about to leave the current page. You will be logged out. Do you want to proceed?");
    if (!confirmed) {
      event.preventDefault(); // Prevent default behavior
    }else {
      // Logout user by removing the x-auth-token
      sessionStorage.removeItem('x-auth-token');
      // Redirect to login page
    navigate('/login');
    setActiveLink('Sign In');
    }
    
  };

  const handleLinkClick = (event) => {
    const confirmed = window.confirm("You are about to leave the current page.You will be logged out. Do you want to proceed?");
    if (!confirmed) {
      event.preventDefault(); // Prevent default behavior
    } else {
      // Logout user by removing the x-auth-token
      sessionStorage.removeItem('x-auth-token');
      navigate('/');
      setActiveLink('Home');
    }
  };

  const homeClick = (event) => {
    navigate('/');
    setActiveLink('Home');
  };
  const signupClick = (event) => {
    navigate('/signup');
    setActiveLink('Sign Up');
  }
  const signinClick = (event) => {
    navigate('/login');
    setActiveLink('Sign In');
  }
  const transactionlink = (event) => {
    navigate('/transactions');
    setActiveLink('Transactions');
  }
  const categoryclick = (event) =>{
    navigate('/category');
    setActiveLink('Category');
  }
  const dashboardClick = (event) => {
    navigate('/dashboard');
    setActiveLink('Dashboard');
  }

  return (
    <nav>
      <ul style={styles.navList}>
        <div style={styles.containerItem}>
          {isHomePage && (
            <>
              <li style={styles.navItem}>
                <NavLink exact to="/" style={styles.link} onClick={homeClick} activeStyle={activeLink === 'Home' ? styles.activeLink : null} >Home</NavLink>
              </li>
              <li style={styles.navItem}>
                <NavLink to="/signup" style={styles.link} onClick={signinClick} activeStyle={activeLink === 'Sign Up' ? styles.activeLink : null} >Sign Up</NavLink>
              </li>
              <li style={styles.navItem}>
                <NavLink to="/login" style={styles.link} onClick={signupClick} activeStyle={activeLink === 'Sign In' ? styles.activeLink : null} >Sign In</NavLink>
              </li>
            </>
          )}
          {!isHomePage && (
            <>
              <li style={styles.navItem}>
                <NavLink exact to="/" style={styles.link} activestyle={activeLink === 'Home' ? styles.activeLink : null} onClick={handleLinkClick}>Home</NavLink>
              </li>
              <li style={styles.navItem}>
                <NavLink to="/dashboard" style={styles.link} activestyle={activeLink === 'Dashboard' ? styles.activeLink : null} >Dashboard</NavLink>
              </li>
              <li style={styles.navItem}>
                <NavLink to="/category" style={styles.link} activestyle={activeLink === 'Category' ? styles.activeLink : null} >Categories</NavLink>
              </li>
              <li style={styles.navItem}>
                <NavLink to="/transactions" style={styles.link} activestyle={activeLink === 'Transactions' ? styles.activeLink : null} >Transactions</NavLink>
              </li>
              {/* <li style={styles.navItem}>
                <NavLink to="/account" style={styles.link} activestyle={activeLink === 'Account' ? styles.activeLink : null} >Account</NavLink>
              </li> */}
              <li style={styles.navItem}>
                <NavLink to="/signup" style={styles.link} activestyle={activeLink === 'Sign Up' ? styles.activeLink : null} onClick={handleSignUpClick}>Sign Up</NavLink>
              </li>
              <li style={styles.navItem}>
                <NavLink to="/login" style={styles.link} activestyle={activeLink === 'Sign In' ? styles.activeLink : null} onClick={handleSignInClick}>Sign In</NavLink>
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
    transition: 'color 0.3s ease', // Smooth transition for font color change
  },
  activeLink: {
    fontWeight: 'bold', // Increase font weight for active link
    textDecoration: 'underline', // Add underline for active link
    fontSize: '1.1em', // Increase font size for active link
  },
  containerItem: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center'
  }
};

export default Navbar;