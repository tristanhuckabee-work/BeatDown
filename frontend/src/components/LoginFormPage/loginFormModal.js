import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import LoginFormPage from './index.js';

import './LoginForm.css';

// ------------------------------------------------------------------------- //


const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={ () => setShowModal(true) } className='login-button'>LOGIN</button>
      {showModal && (
        <Modal onClose={ () => setShowModal(false) }>
          <LoginFormPage />
        </Modal>
      )}
    </>
  );
};

export default LoginFormModal;
  