import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignUpForm';
import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer'
import * as sessionActions from './store/session';
import song from './songs/DontStopTheMusic.mp3';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect( () => {
    dispatch( sessionActions.restoreUser() )
      .then( () => setIsLoaded(true) );
  }, [dispatch] );

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <MusicPlayer song={song} />
      {isLoaded && (
      <Switch>
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

export default App;
