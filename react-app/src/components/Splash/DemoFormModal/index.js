import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import DemoForm from './DemoForm';

import styles from '../../Navbar/Navbar.module.css'

function DemoFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className={styles.splashBtn}>DEMO</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DemoForm />
        </Modal>
      )}
    </>
  );
}

export default DemoFormModal;