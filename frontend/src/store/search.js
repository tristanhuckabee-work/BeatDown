import { csrfFetch } from './csrf';
// ------------------------------------------------------------------------- //
const SONGS = '/SONGS';
const CREATE = '/NEW_SONG';
const EDIT = '/EDIT_SONG';
const DELETE = '/DELETE_SONG';
const SETCURR= '/SET_CURRENT_SONG';
const SETEDIT= '/SET_EDITED_SONG';

const songs   = (payload) => {
  return { type: SONGS, payload }};
const newSong = (payload) => {
  return { type: CREATE, payload }};
const edSong  = (payload) => {
  return { type: EDIT, payload }};
const delSong = (payload) => {
  return { type: DELETE, payload }};
const setCurr = (payload) => {
  return { type: SETCURR, payload}};
const setEdit = (payload) => {
  return { type: SETEDIT, payload}};

// ------------------------------------------------------------------------- //

export const getAllSongs = () => async dispatch => {
  const res = await csrfFetch('/api/search/songs');
  const songArray = await res.json();

  dispatch( songs(songArray) );
};
export const createSong = (song) => async dispatch => {
  const {artistId, title, musicFile, waveFile, createdAt, updatedAt, User} = song;
  const res = await csrfFetch('/api/search/songs/new', {
    method: 'POST',
    body: JSON.stringify({ artistId, title, musicFile, waveFile, createdAt, updatedAt })
  });
  const data = await res.json();
  data.User = User

  dispatch( newSong(data) );
  return data;
}
export const editSong = (song) => async dispatch => {
  const { id, title, musicFile, waveFile, User } = song;
  const res = await csrfFetch('/api/search/songs/:id/edit', {
    method: 'PATCH',
    body: JSON.stringify({ id, title, musicFile, waveFile })
  });
  const data = await res.json();
  data.User = User;

  dispatch( edSong(data) )
  return data;
}
export const deleteSong = (incoming) => async dispatch => {
  const res = await csrfFetch('/api/search/songs/:id/delete', {
    method: 'DELETE',
    body: JSON.stringify({ incoming })
  });
  const data = await res.json();

  dispatch( delSong(data) )
  return data;
}
export const setCurrentSong = (song) => async dispatch => dispatch( setCurr(song) );
export const setEditSong =    (song) => async dispatch => dispatch( setEdit(song) );

const initialState = { songs: [], currentSong: {}, editSong: {} };

const SongReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SONGS:
      newState = { ...state };
      newState.songs = action.payload;
      return newState;
    case CREATE:
      newState = { ...state };
      newState.songs = newState.songs.concat( action.payload );

      return newState;
    case EDIT:
      newState = { ...state };
      newState.songs = newState.songs.map( song => {
        if ( song.id === action.payload.id ) {
          return action.payload;
        } else {
          return song;
        }
      })

      return newState;
    case DELETE:
      newState = { ...state };
      newState.songs = newState.songs
        .filter( song => song.id !== action.payload ? true : false );

      return newState;
    case SETCURR:
      newState = { ...state };
      newState.currentSong = action.payload;

      return newState;
    case SETEDIT:
      newState = {...state};
      newState.editSong = action.payload;
      return newState;
    default:
      return state;
  }
}

// ------------------------------------------------------------------------- //

export default SongReducer;