import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import { useDispatch } from 'react-redux';
import { delOneComment } from '../../store/comments';

import '../DeleteSongPage/deleteSong.css';

// ------------------------------------------------------------------------- //


const CommentDelete = ({ id }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault()
    await dispatch( delOneComment(id) )
    setShowModal(false);
  }


  return (
    <>
      <i className='fas fa-xmark fa-2x' onClick={() => setShowModal(true)}></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='del-modal'>
            <h2>DELETE this Comment?</h2>
            <button onClick={handleDelete}>YES</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CommentDelete;