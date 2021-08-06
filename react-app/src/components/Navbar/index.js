
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

    // const stickySearch = (
    //     <script type="text/javascript">
    //             {
    //             window.addEventListener("scroll", () => {
    //                 console.log("is this working?")
    //                 let aside = document.querySelector("aside");
    //                 if (aside) {
    //                     aside.classList.toggle(`${styles.sticky}`, window.scrollY > 0)
    //                 }
    //             })
    //             }
    //     </script>
    // )

    
    return (
        <nav className={styles.navbarContainer}>
        {user ? (
            // <aside >
                <ul className={styles.navUl}>
                    <li className={styles.home}>
                        <img src={icon} className={styles.icon} onClick={() => {home()}} alt="home"></img>
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
                        <NavLink to={`/new-listing/${userId}`} exact={true} className={styles.navlink} activeClassName='active'>
                        {/* <NavLink to={`/host/${userId}`} exact={true} className={styles.navlink} activeClassName='active'></NavLink> */}
                            <p className={styles.navP}>HOSTING</p>
                        </NavLink>
                    </li>
                    <li className={styles.logoutBtnDiv}><LogoutButton /></li>
                </ul>
            // </aside>
        ) : (
            <ul className={styles.splashNav}>
                <li><DemoFormModal /></li>
                <li><LoginFormModal /></li>
                <li><SignupFormModal /></li>
            </ul>
        )}
        {/* {stickySearch} */}
        </nav>
    );
    }
    
    export default NavBar;
    