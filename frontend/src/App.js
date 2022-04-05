import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignUpForm';
import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer'
import * as sessionActions from './store/session';

import { getAllSongs } from './store/search.js';

// ------------------------------------------------------------------------- //

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currTrack, setCurrTrack] = useState(1);
  
  useEffect( () => {
    dispatch( sessionActions.restoreUser() )
    .then( () => setIsLoaded(true) );
    dispatch( getAllSongs() );
  }, [dispatch] );
  
  const songsObj = useSelector( state => state.search.songs );
  let songList = {};
  songsObj.forEach( song => songList[song.id] = song);

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
                  <h2>{song.title}</h2>  
                  <p>{song.User.username}</p>
                </div>
              )
            })}
          </div>
        </Route>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
      </Switch>
      )}
    </>
  );
}

// ------------------------------------------------------------------------- //

export default App;
