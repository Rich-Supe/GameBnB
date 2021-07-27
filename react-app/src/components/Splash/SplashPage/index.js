import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import styles from './SplashPage.module.css';
import splashImg from '../../../assets/img/splash-zelda2.jpg'


function SplashPage() {
    const user = useSelector(state => state.session.user);

    if (user) {
      return <Redirect to={`/users/${user.id}`} />
    };

    return (
        <div className={styles.splashPageContainer}>
            <h1 className={styles.header}>Welcome to Gamebnb!</h1>
            {/* <div className={styles.imageContainer}>
                <img src={splashImg} alt="Gamebnb" />
            </div> */}
        </div>
    )
}

export default SplashPage;