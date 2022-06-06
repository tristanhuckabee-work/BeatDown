import { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './userPage.css';

// ------------------------------------------------------------------------- //

const UserPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const pageUser = location.state;
  const sessionUser = useSelector( state => state.session.user );
  const songs = useSelector( state => state.search.songs ).filter(song => {
    if (song.artistId === pageUser.id) return true;
  })

  return (
    <div className='user-page-container'>
      <div className='user-page-songs'>
        { songs.map(song => (
            <p key={song.id}>{song.title}</p>
        ))}
      </div>
      <div className='user-page-info'>
          <p>{pageUser.id}</p>
          <p>{pageUser.username}</p>
          <p>{pageUser.profilePic || `nah`}</p>
          <p>{pageUser.biography || `nah`}</p>
          <p>{pageUser.instagram || `nah`}</p>
          <p>{pageUser.twitter || `nah`}</p>
          <p>{pageUser.facebook || `nah`}</p>
      </div>
    </div>
  )
};

// ------------------------------------------------------------------------- //

export default UserPage;