import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';

import styles from '../Navbar/Navbar.module.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/');
  };

  return <button onClick={onLogout} className={styles.logoutBtn}>Logout</button>;
};

export default LogoutButton;
