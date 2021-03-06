import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink, useHistory } from 'react-router-dom';
import CreateSongPage from './components/CreateSongPage';
import EditSongPage from './components/EditSongPage';
import DeleteModal from './components/DeleteSongPage/deleteModal';
import Like from './components/Like';
import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer';
import UserPage from './components/UserPage';
import Footer from './components/Footer';

import * as sessionActions from './store/session';
import { getAllSongs, setCurrentSong, setEditSong } from './store/search.js';
import { getAllLikes } from './store/like.js';
import SongPage from './components/SongPage';

// ------------------------------------------------------------------------- //

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect( () => {
    dispatch( sessionActions.restoreUser() )
    .then( () => setIsLoaded(true) );
    dispatch( getAllSongs() );
    dispatch( getAllLikes() );
  }, [dispatch] );
  
  const sessionUser = useSelector( state => state.session.user );
  const songsObj = useSelector( state => state.search.songs );
  const currSong = useSelector( state => state.search.currentSong);
  const editSong = useSelector( state => state.search.editSong);
  const likes = useSelector( state => state.likes );

  const handleEdit =      async (song) => await dispatch(setEditSong(song));
  const handleSongClick = async (song) => {
    await dispatch(setCurrentSong(song));
    if (sessionUser) {
      history.push({
        pathname: `/songs/${song.id}`,
        state: song
      });
    }
  }
  const handlePClick = (e, user) => {
    e.stopPropagation();

    history.push({
      pathname: `/u/${user.username}`,
      state: user
    })
  }
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
                    onClick={ () => handleEdit(song) }
                  ></i>
                </NavLink>
              </>
            )
          }
          <Like song={song} likes={likes} user={sessionUser.id}/>
        </div>
      )
    }
  }
  const chooseMain = () => {
    if (sessionUser) {
      return (
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
                <p onClick={(e) => handlePClick(e, song.User)}>{song.User?.username}</p>
                { userPriv(song) }
              </div>
            </div>
          )
        })}
        </div>
      )
    } else {
      return (
        <main>
          <div className='splash'>
            <h1>Upload, Listen, Get Down</h1>
          </div>
          <h2>Check These Beats Out!</h2>
          <div className='preview'>
            { songsObj.map( (song, idx) => {
                if (idx < 5) {
                  return (
                    <div className='songSquare' key={song.id} onClick={ () => handleSongClick(song) } >
                      <img src={song.waveFile} alt="Album Cover" />
                    </div>
                  )
                } else {
                  return null;
                }
              })
            }
          </div>
        </main>
      )
    }
  }

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <MusicPlayer song={currSong} />
      {isLoaded && (
      <Switch>
        <Route exact path='/'>
          { chooseMain() }
        </Route>
        <Route path='/songs/:id'>
          <SongPage />
        </Route>
        <Route path='/search/songs/new'>
          <CreateSongPage />
        </Route>
        <Route path='/search/songs/:id/edit'>
          <EditSongPage song={editSong} />
        </Route>
        <Route path='/u/:username'>
          <UserPage />
        </Route>
      </Switch>
      )}
      <Footer />
    </>
  );
}

// ------------------------------------------------------------------------- //

export default App;
