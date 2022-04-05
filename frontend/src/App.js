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
  // const songsObj = useSelector( state => state.search.songs );

  useEffect( () => {
    dispatch( sessionActions.restoreUser() )
      .then( () => setIsLoaded(true) );
    // dispatch( getAllSongs() );
  }, [dispatch] );


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <MusicPlayer song={song} />
      {isLoaded && (
      <Switch>
        <Route exact path='/'>
          <Test />
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
