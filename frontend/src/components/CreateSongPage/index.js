import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSong } from '../../store/search';

import './createSong.css';

// ------------------------------------------------------------------------- //

const CreateSongPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector( state => state.session.user );
  const [title, setTitle] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      artistId: sessionUser.id,
      title,
      musicFile: musicUrl, 
      waveFile: imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
      User: sessionUser
    }

    const res = await dispatch( createSong(payload) );

    history.push('/');
    // res.ok ? history.push('/') : setErrors(res)
  }

  if (sessionUser) { 
    return (
      <form onSubmit={handleSubmit} id='createSong'>
        { errors.length > 0 && (
          <ul id='creationErrors'>
            { errors.map( (err, idx) => <li key={idx}>{err}</li>)}
          </ul>
        )}
        <input required placeholder='Title' type='text'
          value={title} onChange={ e => setTitle(e.target.value)} />
        <input required placeholder='Music URL' type='text'
          value={musicUrl} onChange={ e => setMusicUrl(e.target.value)} />
        <input required placeholder='Image URL' type='text'
        value={imageUrl} onChange={ e => setImageUrl(e.target.value)} />
        <button type='submit' id='create-subm'>UPLOAD SONG</button>
      </form>
    )
  } else {
    <Redirect to='/' />
  }
};

// ------------------------------------------------------------------------- //

export default CreateSongPage;