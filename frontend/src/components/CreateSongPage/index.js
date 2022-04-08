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
  const noImg = 'https://res.cloudinary.com/dzsgront4/image/upload/v1649372610/images_ffms2y.png';

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
      artistId: sessionUser.id,
      title,
      musicFile: musicUrl, 
      waveFile: imageUrl || noImg,
      createdAt: new Date(),
      updatedAt: new Date(),
      User: sessionUser
    }
    
    let errors = validateInput(payload);
    if ( errors.length === 0 ) {
      const res = await dispatch( createSong(payload) );
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
        <input placeholder='Title' type='text'
          value={title} onChange={ e => setTitle(e.target.value)} />
        <input placeholder='Music URL' type='text'
          value={musicUrl} onChange={ e => setMusicUrl(e.target.value)} />
        <input placeholder='Image URL' type='text'
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