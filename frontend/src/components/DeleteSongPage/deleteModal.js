import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import DeleteSongPage from './index.js';

import './deleteSong.css';

// ------------------------------------------------------------------------- //


const DeleteModal = ({song}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i className='fas fa-delete-left fa-2x' onClick={ () => setShowModal(true) }></i>
      {showModal && (
        <Modal onClose={ () => setShowModal(false) }>
          <DeleteSongPage song={song} />
        </Modal>
      )}
    </>
  );
};

export default DeleteModal;
  