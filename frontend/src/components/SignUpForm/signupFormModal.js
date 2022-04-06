import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import SignupFormPage from './index.js';

import './signupForm.css';

// ------------------------------------------------------------------------- //


const SignupFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={ () => setShowModal(true) } className='signup-button'>REGISTER</button>
      {showModal && (
        <Modal onClose={ () => setShowModal(false) }>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
};

export default SignupFormModal;
  