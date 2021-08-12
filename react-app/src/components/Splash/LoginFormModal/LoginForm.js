import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import styles from './LoginFormModal.module.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // if (user) {
  //   return <Redirect to='/' />;
  // }

  return (
    <form className={styles.loginForm} onSubmit={onLogin}>
      <div className={styles.loginFormErrors}>
        {errors.map((error, ind) => (
          <div key={ind} className={styles.errors}>{error}</div>
        ))}
      </div>
      <h2 className={styles.header}>
          Log In:
      </h2>
      <div>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          required
        />
      </div>
      <div>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          required
        />
      </div>
      <div className='wrapper'>
        <button className={styles.submit} type='submit'>LOG IN</button>
      </div>
    </form>
  );
};

export default LoginForm;
