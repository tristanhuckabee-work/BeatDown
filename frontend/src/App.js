import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignUpForm';
import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer'
import Test from './components/Test'
import * as sessionActions from './store/session';
// TEMP SONG GRAB
import song from './songs/DontStopTheMusic.mp3';
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
  console.log('CURR TRACK:', currTrack)

  const handleSongClick = (song) => {
    setCurrTrack(song);
    console.log('SONG STUFF', Object.keys(currTrack) )
  }

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <MusicPlayer song={currTrack} />
      {isLoaded && (
      <Switch>
        <Route exact path='/'>
          {/* <Test songs={songsObj}/> */}
          <div className='songList'>
            <h2>TRACKS</h2>
            <h3>Current Song: {currTrack.musicFile || 'NAH'}</h3>
            {songsObj.map( song => {
              return (
                <div
                  key={song.id}
                  className='songItem'
                  // onClick={ () => setCurrTrack(song.id) }
                  onClick={ () => handleSongClick(song) }
                  >{song.title}</div>  
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
