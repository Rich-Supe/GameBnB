import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SignupForm from './SignupForm';

import styles from '../../Navbar/Navbar.module.css'

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className={styles.splashBtn}>SIGN UP</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;