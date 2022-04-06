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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      id: song.id,
      title,
      musicFile: musicUrl, 
      waveFile: imageUrl
    }

    const res = await dispatch( editSong(payload) );

    res === 'Post Successful' ? history.push('/') : setErrors(res)
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