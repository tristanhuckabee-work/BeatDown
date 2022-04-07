import { csrfFetch } from './csrf';

// ------------------------------------------------------------------------- //

const SONGS = '/search/songs';
const CREATE = '/search/songs/new';
const EDIT = '/search/songs/:id/edit';
const DELETE = '/search/songs/:id/delete';

const initialState = { songs: [] };


const songs = (payload) => {
  return { type: SONGS, payload }};
const newSong = (payload) => {
  return { type: CREATE, payload }};
const edSong = (payload) => {
  return { type: EDIT, payload }};
const delSong = (payload) => {
  return { type: DELETE, payload }};

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

      newState.songs = newState.songs.filter( song => {
        if ( song.id !== action.payload ) return song;
      })

      return newState;
    default:
      return state;
  }
}

// ------------------------------------------------------------------------- //

export default SongReducer;