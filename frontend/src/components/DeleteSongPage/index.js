import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSong } from '../../store/search';
import { Modal } from '../../context/modal';

import './deleteSong.css';

// ------------------------------------------------------------------------- //

const DeleteSongPage = ({song}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    
    const payload = song.id;

    await dispatch( deleteSong(payload) );

    history.push('/');
  }

  return (
    <div className='del-modal'>
      <h2>DELETE "{song?.title}" ?</h2>
      <button onClick={handleDelete}>YES</button>
    </div>
  )
};

// ------------------------------------------------------------------------- //

export default DeleteSongPage;