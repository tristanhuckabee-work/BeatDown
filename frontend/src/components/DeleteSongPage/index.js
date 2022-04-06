import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editSong } from '../../store/search';

import './deleteSong.css';

// ------------------------------------------------------------------------- //

const EditSongPage = ({song}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector( state => state.session.user );

  const handleSubmit = async (e) => { }

  if (sessionUser) { 
    return (
      <div className='del-container'>
        <div className='del-modal'>
          <h2>DELETE "{song.title}" ?</h2>
          <div className='del-opts'>
            <button>YES</button>
            <button>NO</button>
          </div>
        </div>
      </div>
    )
  } else {
    <Redirect to='/' />
  }
};

// ------------------------------------------------------------------------- //

export default EditSongPage;