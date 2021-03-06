import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
// import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import styles from './SignupForm.module.css';

const SignupForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  // const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
//   console.log(errors);
//   console.log(password, repeatPassword);

  const host = true;

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(name, username, email, password, host));
      if (data) {
        setErrors(data)
      }
    } else {
        setErrors(['Passwords do not match!']);
    }
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    // console.log(password)
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  // if (user) {
  //   return <Redirect to='/' />;
  // }

  return (
    <form className={styles.signupForm} onSubmit={onSignUp}>
      <div className={styles.signupFormErrors}>
        {errors.map((error, ind) => (
          <div key={ind} className={styles.errors}>{error}</div>
        ))}
      </div>
      <h2 className={styles.header}>
          Sign up
      </h2>
      <div>
        <input
          type='text'
          name='name'
          placeholder='Name'
          onChange={updateName}
          value={name}
          required
        ></input>
      </div>
      <div>
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={updateUsername}
          value={username}
          required
        ></input>
      </div>
      <div>
        <input
          type='text'
          name='email'
          placeholder='Email'
          onChange={updateEmail}
          value={email}
          required
        ></input>
      </div>
      <div>
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={updatePassword}
          value={password}
          required
        ></input>
      </div>
      <div>
        <input
          type='password'
          name='repeat_password'
          placeholder='Confirm Password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className={styles.wrapper}>
        <button type='submit' className={styles.submit}>Create Account</button>
      </div>
    </form>
  );
};

export default SignupForm;