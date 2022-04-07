import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteSong } from '../../store/search';

import './deleteSong.css';

// ------------------------------------------------------------------------- //

const DeleteSongPage = ({song}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();
    
    const payload = song.id;

    const res = dispatch( deleteSong(payload) );

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