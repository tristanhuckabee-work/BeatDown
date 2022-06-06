import { useState } from 'react';
import { Redirect, useHistory, useLocation, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '../DeleteSongPage/deleteModal';
import { setCurrentSong } from '../../store/search';
import './userPage.css';

// ------------------------------------------------------------------------- //

const UserPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const pageUser = location.state;
  const sessionUser = useSelector(state => state.session.user);
  const songs = useSelector(state => state.search.songs).filter(song => {
    if (song.artistId === pageUser.id) return true;
  })
  const currSong = useSelector( state => state.search.currentSong)

  const userPriv = (song) => {
    if (sessionUser) {
      return (
        <div className='userIcons'>
          { sessionUser.id === song.User.id && (
              <>
                <DeleteModal song={song}/>
                <NavLink to={`/search/songs/${song.id}/edit`}>
                  <i
                    className='fas fa-pen-to-square fa-2x'
                    // onClick={ () => handleEdit(song) }
                  ></i>
                </NavLink>
              </>
            )
          }
          {/* <Like song={song} likes={likes} user={sessionUser.id}/> */}
        </div>
      )
    }
  }
  const handleSongClick = async (song) => {
    await dispatch( setCurrentSong(song) )
  }

  return (
    <div className='user-page-container'>
      <div className='user-page-songs'>
        {songs.map(song => {
          return (
            <div className='songItem' key={song.id} onClick={() => handleSongClick(song)}>
              <div className='songpage'>
                <img src={song.waveFile} alt="Album Cover" />
                <h2>{song.title}</h2>
              </div>
              <div className='userInfo'>
                {userPriv(song)}
              </div>
            </div>
          )
        })}
      </div>
      <div className='user-page-info'>
        <span className='user-name-pic'>
          <p>@{pageUser.username}</p>
          <div className='user-page-pic'
            style={{backgroundImage: `url(${pageUser.profilePic})`}}
          ></div>
        </span>
        <span className='user-span social'>
          <i className='fab fa-instagram' />
          <p>{pageUser.instagram || `No Swag?`}</p>
        </span>
        <span className='user-span social'>
          <i className='fab fa-twitter' />
          <p>{pageUser.twitter || `No Takes?`}</p>
        </span>
        <span className='user-span social'>
          <i className='fab fa-facebook-square' />
          <p>{pageUser.facebook || `That's Fair.`}</p>
        </span>
        <p>BIO: {pageUser.biography || `No Word Good?`}</p>
      </div>
    </div>
  )
};

// ------------------------------------------------------------------------- //

export default UserPage;