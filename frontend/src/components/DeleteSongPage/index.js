import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSong } from '../../store/search';

import './deleteSong.css';

// ------------------------------------------------------------------------- //

const DeleteSongPage = ({song}) => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();
    
    const payload = song.id;

    await dispatch( deleteSong(payload) );

    return <Redirect to='/' />
  }

  return (
    <div className='del-container'>;
      <div className='del-modal'>
        <h2>DELETE "{song.title}" ?</h2>
        <div className='del-opts'>
          <button onClick={handleDelete}>YES</button>
          <button>NO</button>
        </div>
      </div>
    </div>
  )
};

// ------------------------------------------------------------------------- //

export default DeleteSongPage;