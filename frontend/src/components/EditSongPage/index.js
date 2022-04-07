import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editSong } from '../../store/search';

import './editSong.css';

// ------------------------------------------------------------------------- //

const EditSongPage = ({song}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector( state => state.session.user );
  const [title, setTitle] = useState(song.title);
  const [musicUrl, setMusicUrl] = useState(song.musicFile);
  const [imageUrl, setImageUrl] = useState(song.waveFile);
  const [errors, setErrors] = useState([]);

  const validateInput = (object) => {
    let errors = [];

    if ( !object.title.length ) errors.push('Please enter a Title')
    if ( !object.musicFile) {
      errors.push('Please provide a URL for your song')
    } else if ( !object.musicFile.startsWith('https://') ) {
      errors.push('Please provede a URL for your song')
    }

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      id: song.id,
      title,
      musicFile: musicUrl, 
      waveFile: imageUrl,
      User: sessionUser
    }

    let errors = validateInput(payload);
    if ( errors.length === 0 ) {
      const res = await dispatch( editSong(payload) );
      history.push('/');
    } else {
      setErrors(errors)
    }
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
        <button type='submit' id='create-subm'>UPDATE SONG</button>
      </form>
    )
  } else {
    <Redirect to='/' />
  }
};

// ------------------------------------------------------------------------- //

export default EditSongPage;