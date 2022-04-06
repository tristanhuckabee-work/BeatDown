import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignUpForm';
import CreateSongPage from './components/CreateSongPage';
import EditSongPage from './components/EditSongPage';
import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';
import * as sessionActions from './store/session';

import { getAllSongs } from './store/search.js';

// ------------------------------------------------------------------------- //

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currTrack, setCurrTrack] = useState(1);
  const [editSong, setEditSong] = useState(undefined)
  
  useEffect( () => {
    dispatch( sessionActions.restoreUser() )
    .then( () => setIsLoaded(true) );
    dispatch( getAllSongs() );
  }, [dispatch] );
  
  const sessionUser = useSelector( state => state.session.user );
  const songsObj = useSelector( state => state.search.songs );
  let songList = {};
  songsObj.forEach( song => songList[song.id] = song);

  const handleEdit = (clicked) => {
    setEditSong(clicked);
  }
  const userPriv = (song) => {
    if ( sessionUser?.id === song.User.id) {
      return (
        <div className='userIcons'>
          <i className='fas fa-delete-left fa-2x'></i>
          <NavLink to={`/search/songs/${song.id}/edit`}>
            <i className='fas fa-pen-to-square fa-2x' onClick={ () => handleEdit(song) }></i>
          </NavLink>
          <i className='fas fa-heart fa-2x'></i>
          <i className='fas fa-message fa-2x'></i>
        </div>
      )
    } else {
      return (
        <div className='userIcons'>
          <i className='fas fa-heart fa-2x'></i>
          <i className='fas fa-message fa-2x'></i>
        </div>
      )
    }
  }

  const handleSongClick = (song) => {
    setCurrTrack(song);
  }

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <MusicPlayer song={currTrack} />
      {isLoaded && (
      <Switch>
        <Route exact path='/'>
          <div className='songList'>
            <h2>TRACKS</h2>
            {songsObj.map( song => {
              return (
                <div className='songItem' key={song.id} onClick={ () => handleSongClick(song) }>
                  <div className='songpage'>
                    <img src={song.waveFile} alt="Album Cover" />
                    <h2>{song.title}</h2>  
                  </div>
                  <div className='userInfo'>
                    <p>{song.User.username}</p>
                    { userPriv(song) }
                  </div>
                </div>
              )
            })}
          </div>
        </Route>
        <Route path='/search/songs/new'>
          <CreateSongPage />
        </Route>
        <Route path='/search/songs/:id/edit'>
          <EditSongPage song={editSong} />
        </Route>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
      </Switch>
      )}
      <Footer />
    </>
  );
}

// ------------------------------------------------------------------------- //

export default App;
