
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../Splash/LoginFormModal';
import SignupFormModal from '../Splash/SignupFormModal';
import DemoFormModal from '../Splash/DemoFormModal'

import { useHistory } from 'react-router-dom'
import styles from './Navbar.module.css'
import icon from '../../assets/img/favicon4.jpg'


const NavBar = () => {
    const history = useHistory()
    const user = useSelector(state => state.session.user);
    let userId = user ? user.id : null;

    function home() {
        history.push('/home');
    }

    
    return (
        <nav className={styles.navbarContainer}>
        {user ? (
            <ul className={styles.navUl}>
                <li className={styles.home}>
                    <img src={icon} className={styles.icon} onClick={() => {home()}}></img>
                    {/* <p>Gamebnb</p> */}
                </li>
                <li>
                    <NavLink to={`/users/${userId}`} exact={true} className={styles.navlink} activeClassName='active'>
                    <p className={styles.navP}>PROFILE</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/listings`} exact={true} className={styles.navlink} activeClassName='active'>
                    <p className={styles.navP}>LISTINGS</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/host/${userId}`} exact={true} className={styles.navlink} activeClassName='active'>
                        <p className={styles.navP}>Hosting</p>
                    </NavLink>
                </li>
                <li><LogoutButton /></li>
            </ul>
        ) : (
            <ul className={styles.navUl}>
                <li><DemoFormModal /></li>
                <li><LoginFormModal /></li>
                <li><SignupFormModal /></li>
            </ul>
        )}
        </nav>
    );
    }
    
    export default NavBar;
    