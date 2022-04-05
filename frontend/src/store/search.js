import { csrfFetch } from './csrf';

// ------------------------------------------------------------------------- //

const SONGS = '/search/songs';
const songs = (payload) => {
  return {
    type: SONGS,
    payload
  }
};

export const getAllSongs = () => async dispatch => {
  const res = await csrfFetch('/api/search/songs');
  const songArray = await res.json();

  dispatch( songs(songArray) );
};

const initialState = { songs: [] };

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