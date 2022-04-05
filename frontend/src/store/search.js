import { csrfFetch } from './csrf';

// ------------------------------------------------------------------------- //

const SONGS = '/search/songs';
const CREATE = '/search/songs/new';

const initialState = { songs: [] };


const songs = (payload) => {
  return { type: SONGS, payload
  }
};
// const newSong = (payload) => {
//   return { type: CREATE, payload
//   }
// }

export const getAllSongs = () => async dispatch => {
  const res = await csrfFetch('/api/search/songs');
  const songArray = await res.json();

  dispatch( songs(songArray) );
};
export const createSong = (song) => async (dispatch) => {
  const {artistId, title, musicFile, waveFile, createdAt, updatedAt} = song;
  const res = await csrfFetch('/api/search/songs/new', {
    method: 'POST',
    body: JSON.stringify({ artistId, title, musicFile, waveFile, createdAt, updatedAt })
  });
  const data = await res.json();
  return data;
}

const SongReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SONGS:
      newState = { ...state };
      newState.songs = action.payload;
      return newState;
    default:
      return state;
  }
}

// ------------------------------------------------------------------------- //

export default SongReducer;